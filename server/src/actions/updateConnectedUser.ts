import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'
import { geohashForLocation} from 'geofire-common'
import { connectedUsersCollection } from '../utilities/adminInit'

export const toggleUserConnectionStatus = async (index: string) => {
    try {
        let status = connectedUsersCollection.doc(index).isConnected
        // Flip the connection status
        status = !status

        await connectedUsersCollection.doc(index).update({ isConnected: status })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}

export const updateUserLocation = async (userIndex: string, lat: number, lon: number) => {
    try {
        const ref = doc(connectedUsers, userIndex)
        const userDoc = await getDoc(ref)

        if (!userDoc.exists()) throw Error("[FIREBASE] User does not exist.")

        const newHash = geohashForLocation([lat, lon])

        updateDoc(ref, { "location.lat": lat, "location.lon": lon, "location.geohash": newHash })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}
