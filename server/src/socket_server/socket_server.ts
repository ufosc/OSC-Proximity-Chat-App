import http from "http"
import io from "socket.io";

import { ActiveUser } from "../types";
import firebase from "firebase-admin";
import * as methods from "./methods";
import { initRegions, removeActiveUser } from "./regions";

export type IOSocket = io.Socket<io.DefaultEventsMap, io.DefaultEventsMap, io.DefaultEventsMap, any>

export interface ConnectionContext {
    socket: IOSocket,
    user: ActiveUser,
}

export const startSocketServer = () => {
    initRegions();

    const port = Number(process.env.socket_port) ?? 8082;

    const httpServer = http.createServer();
    const socketServer = new io.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    socketServer.on("connection", async (socket: IOSocket) => {
        // === Ensure Authorized === 

        const token = socket.handshake.auth.token;

        if (!token) {
            console.error("[WS] User not authenticated!");
            socket.emit("User not authenticated!");
            socket.disconnect();
            return
        }

        var uid: string;
        try {
            const decodedToken = await firebase.auth().verifyIdToken(token);
            uid = decodedToken.uid;
            console.log(`[WS] User <${uid}> authenticated.`);
        } catch {
            console.error("[WS] User id token is invalid!");
            socket.emit("User id token is invalid!");
            socket.disconnect();
            return;
        }
        
        //

        console.log(`[WS] User <${socket.id}> connected.`);
        const ctx: ConnectionContext = {
            socket: socket,
            user: {
                socket: socket,
                uid: uid,
                // User is not added to region map until first updateLocation is called, so values being 0 here is fine
                // !! geohash must be "" for first call to updateLocation to work properly !!
                location: {
                    lat: 0.0,
                    lon: 0.0,
                    geohash: "",
                }
            },
        }

        socket.on("disconnect", (reason) => {
            console.log(`[WS] User <${socket.id}> disconnected.`);
            removeActiveUser(ctx.user);
        })

        // === METHODS ===

        socket.on("ping", (ack: any) => methods.ping(ctx, ack));
        socket.on("updateLocation", (location: any, ack: any) => methods.updateLocation(ctx, location, ack))
        socket.on("message", (message: any, ack: any) => methods.message(ctx, message, ack));
        socket.on("nearby", (callback: (nearbyUserUids: string[]) => void) => methods.nearby(ctx, callback));

        // 
    });

    httpServer.listen(port, () => {
        console.log(`[WS] Listening for new connections on port ${port}.`);
    });
}
