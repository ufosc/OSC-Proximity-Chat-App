import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'
import { geohashForLocation} from 'geofire-common'

export const toggleUserConnectionStatus = async (index: string) => {
    try {
        const userRef = doc(connectedUsers, index)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) throw Error("[FIREBASE] User does not exist.")

        let status = userDoc.data()['isConnected']

        // Flip the connection status
        status = !status

        updateDoc(userRef, { isConnected: status })
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
