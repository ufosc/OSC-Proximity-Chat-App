import { ActiveUser } from "../../types";
import { getActiveUsersInView } from "../regions";
import { ConnectionContext } from "../socket_server";

const filterOutSenderAndConvertToProfiles = function* (ctx: ConnectionContext, activeUsers: Generator<ActiveUser, any, any>): Generator<any, any, any> {
    for (const activeUser of activeUsers) {
        if (activeUser.uid === ctx.user.uid) continue;
        yield {
            uid: activeUser.uid,
            profile: activeUser.profile,
        };
    }
}

export const getNearbyUsers = (ctx: ConnectionContext, callback: (nearbyUserUids: string[]) => void): void => {
    // Get all users in view
    const usersInView = getActiveUsersInView(ctx.user.location);

    // Filter out user who send this request and convert ActiveUser objects to uids
    const others = filterOutSenderAndConvertToProfiles(ctx, usersInView);

    // Response to the sender (also convert generator to array)
    callback([...others]);
}