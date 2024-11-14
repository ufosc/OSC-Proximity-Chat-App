import { Message } from "../../types";
import { getActiveUsersInView } from "../regions";
import { ConnectionContext } from "../socket_server";

// Called when client sends a message
export const sendMessage = (ctx: ConnectionContext, message: Message, ack: any): void => {
    const recipients = getActiveUsersInView(message.location);
    for (const recipient of recipients) {
        recipient.socket.emit("message", message);
    }

    if (ack) ack("success");
}