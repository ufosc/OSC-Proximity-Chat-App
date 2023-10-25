import { doc, getDoc } from "firebase/firestore";
import { users } from "../utilities/firebaseInit";

export const createUser = async (userId: string, userDisplayName: string, broadLat: string, broadLon: string, specificLat: string, specificLon: string) => {
    // WIP
}