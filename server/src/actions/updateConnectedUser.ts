import { geohashForLocation} from 'geofire-common'
import { connectedUsersCollection } from '../utilities/firebaseInit'

export const toggleUserConnectionStatus = async (socketID: string) => {
    try {
        let status = connectedUsersCollection.doc(socketID).isConnected
        // Flip the connection status
        status = !status

        await connectedUsersCollection.doc(socketID).update({ isConnected: status })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}

export const updateUserLocation = async (socketID: string, lat: number, lon: number) => {
    try {
        const newHash = geohashForLocation([lat, lon])

        await connectedUsersCollection.doc(socketID).update({ "location.lat": lat, "location.lon": lon, "location.geohash": newHash })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}
