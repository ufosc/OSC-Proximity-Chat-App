import { IOSocket } from "../socket_server/socket_server";
import { Location, UserProfile } from "../types";

export interface ActiveUser {
    socket: IOSocket

    uid: string,
    location: Location,

    profile: UserProfile,
}
