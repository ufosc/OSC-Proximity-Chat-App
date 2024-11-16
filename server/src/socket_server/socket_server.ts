import http from "http"
import io from "socket.io";

import { ActiveUser } from "../types";
import * as methods from "./methods";
import { initRegions, removeActiveUser } from "./regions";
import { ensureUserAuthorized, getUserProfile } from "./firebase_methods";

export type IOSocket = io.Socket<io.DefaultEventsMap, io.DefaultEventsMap, io.DefaultEventsMap, any>

export interface ConnectionContext {
    socket: IOSocket,
    user: ActiveUser,
}

export const startSocketServer = () => {
    initRegions();

    const port = Number(process.env.socket_port ?? "8082");

    const httpServer = http.createServer();
    const socketServer = new io.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });

    socketServer.on("connection", async (socket: IOSocket) => {
        // === Ensure Authorized === 

        const token = socket.handshake.auth.token;
        const [uid, authError] = await ensureUserAuthorized(token);

        if (authError) {
            console.error(`[WS] ${authError}`);
            socket.emit(authError);
            socket.disconnect();
            return
        }

        console.log(`[WS] User <${uid}> authenticated.`);

        //

        // === Pull User Profile from Firebase ===

        const userProfile = await getUserProfile(uid);
        if (userProfile === undefined) {
            console.error("[WS] User profile is invalid or has not been created!");
            socket.emit("User profile is invalid or has not been created!");
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
                },
                profile: {
                    displayName: userProfile.displayName,
                    profilePicture: userProfile.profilePicture,
                }
            },
        }

        socket.on("disconnect", (reason) => {
            console.log(`[WS] User <${socket.id}> disconnected.`);
            removeActiveUser(ctx.user);
        })

        // === METHODS ===

        socket.on("ping", (_: any, ack: any) => methods.ping(ctx, ack));
        socket.on("updateLocation", (location: any, ack: any) => methods.updateLocation(ctx, location, ack))
        socket.on("sendMessage", (message: any, ack: any) => methods.sendMessage(ctx, message, ack));
        socket.on("getNearbyUsers", (_: any, callback: (nearbyUserUids: string[]) => void) => methods.getNearbyUsers(ctx, callback));
        socket.on("notifyUpdateProfile", (_: any, ack: any) => methods.notifyUpdateProfile(ctx, ack));

        // 
    });

    httpServer.listen(port, () => {
        console.log(`[WS] Listening for new connections on port ${port}.`);
    });
}
