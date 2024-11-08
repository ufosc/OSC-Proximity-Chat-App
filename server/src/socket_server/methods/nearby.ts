import { ActiveUser } from "../../types";
import { getActiveUsersInView } from "../regions";
import { ConnectionContext } from "../socket_server";

const filterOutSenderAndConvertToUids = function* (ctx: ConnectionContext, activeUsers: Generator<ActiveUser, any, any>): Generator<string, any, any> {
    for (const activeUser of activeUsers) {
        if (activeUser.uid === ctx.user.uid) continue;
        yield activeUser.uid;
    }
}

export const nearby = (ctx: ConnectionContext, callback: (nearbyUserUids: string[]) => void): void => {
    // Get all users in view
    const usersInView = getActiveUsersInView(ctx.user.location);

    // Filter out user who send this request and convert ActiveUser objects to uids
    const others = filterOutSenderAndConvertToUids(ctx, usersInView);

    // Response to the sender (also convert generator to array)
    callback([...others]);
}