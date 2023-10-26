import { doc, setDoc } from "firebase/firestore";
import { users } from "../utilities/firebaseInit";

export const createUser = async (userId: string, userDisplayName: string) => {
    const newUserRef = doc(users, userId)
    setDoc(newUserRef, {
        userId: userId,
        userDisplayName: userDisplayName,
        broadLat: "0",
        broadLon: "0",
        specificLat: "0",
        specificLon: "0",
    })
}