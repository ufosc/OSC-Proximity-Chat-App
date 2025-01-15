import { getUserProfile } from "../../firebase_methods";
import { getActiveUsersInView } from "../regions";
import { ConnectionContext } from "../socket_server";

export const notifyUpdateProfile = async (ctx: ConnectionContext, ack: any): Promise<void> => {
    console.log(`[WS] Received notification of user profile update <${ctx.socket.id}>.`);

    // pull updated user profile from Firebase
    const userProfile = await getUserProfile(ctx.user.uid);
    ctx.user.profile.displayName = userProfile.displayName;
    ctx.user.profile.profilePicture = userProfile.profilePicture;

    const messageToNearbyOthers = {
        uid: ctx.user.uid,
        profile: ctx.user.profile,
    };

    // forward notification to all nearby users
    const usersInView = getActiveUsersInView(ctx.user.location);
    for (const userInView of usersInView) {
        if (userInView.uid === ctx.user.uid) continue; // Skip sender
        userInView.socket.emit('notifyUpdateProfile', messageToNearbyOthers);
    }

    if (ack) ack("success");
}