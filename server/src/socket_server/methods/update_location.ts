import { Location } from "../../types"
import { setActiveUserRegion } from "../regions";
import { ConnectionContext } from "../socket_server";

export const updateLocation = (ctx: ConnectionContext, newLocation: any, ack: any): void => {
    console.log(`[WS] Received new location from user <${ctx.socket.id}>.`);

    // Convert object to location instance and calculate geohash if it wasn't provided by the client (happens inside Location constructor)
    try {
        newLocation = new Location(newLocation);
    } catch {
        console.error("[WS] Error calling updateLocation: Invalid [lat/lon].");
        return;
    }

    // If this is the first time the user has called updateLocation since connecting, geohash will be "" and their location is undefined
    const oldLocation = ctx.user.location.geohash !== "" ? ctx.user.location : undefined;

    setActiveUserRegion(ctx.user, oldLocation, newLocation);
    ctx.user.location = newLocation;

    if (ack) ack("success");
}