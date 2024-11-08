import { ConnectionContext } from "../socket_server";

export const ping = (ctx: ConnectionContext, ack: any): void => {
    // The (ack) parameter stands for "acknowledgement." This function sends a message back to the originating socket.
    console.log(`[WS] Received ping from user <${ctx.socket.id}>.`);
    if (ack) ack("pong");
}