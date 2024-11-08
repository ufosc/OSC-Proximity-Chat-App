import { IOSocket } from "../socket_server/socket_server";
import { Location } from "./location";

export interface ActiveUser {
    socket: IOSocket

    uid: string,
    location: Location,
}