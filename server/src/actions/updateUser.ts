import { collection, updateDoc, doc, getFirestore } from "firebase/firestore";
import { convertToBroadCoordinates } from "../utilities/convertToBroadCoordinates";

export const updateUserLocation = async (userId: string, newSpecificLat: string, newSpecificLon: string) => {
    const db = getFirestore()

    const broadCoords = await convertToBroadCoordinates([Number(newSpecificLat), Number(newSpecificLon)])
    const broadLat = broadCoords[0]
    const broadLon = broadCoords[1]

    try {
        await updateDoc(doc(db, 'users', userId), {
            specificLat: newSpecificLat,
            specificLon: newSpecificLon,
            broadLat: broadLat,
            broadLon: broadLon
        })
    } catch (error) {
        return false
    }

    return true
}
