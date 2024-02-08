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
        const userRef = doc(connectedUsers, userIndex)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) throw Error("[FIREBASE] User does not exist.")

        const hash = geohashForLocation([lat, lon])
        const location = { lat: lat, lon: lon, geohash: hash }

        updateDoc(userRef, { location: location })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}
