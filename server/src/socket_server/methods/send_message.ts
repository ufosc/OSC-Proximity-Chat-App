import { Message } from "../../types";
import { getActiveUsersInView } from "../regions";
import { ConnectionContext } from "../socket_server";

// Called when client sends a message
export const sendMessage = (ctx: ConnectionContext, message: Message, ack: any): void => {
    if (message.location === undefined) {
        message.location = ctx.user.location;
    }
    if (message.location.lat > 90 || message.location.lat < -90 || message.location.lon > 180 || message.location.lon < -180) {
        console.log("[WS] User tried to send message with invalid location.");
        if (ack) ack("invalid_location");
        return;
    }
    message.timestamp = Date.now();

    const recipients = getActiveUsersInView(message.location);
    const seen = new Set<string>(); // Geofire can return duplicates. Prevent sending message to the same user multiple times
    for (const recipient of recipients) {
        //if (recipient.uid == ctx.user.uid) continue; // skip sender

        if (seen.has(recipient.uid)) continue;
        seen.add(recipient.uid);

        recipient.socket.emit("message", message);
        console.log("[WS] Sent message to user <" + recipient.uid + ">");
    }

    if (ack) ack("success");
}