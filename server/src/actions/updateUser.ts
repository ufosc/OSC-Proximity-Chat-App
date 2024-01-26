import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { users } from '../utilities/firebaseInit'
import { geohashForLocation} from 'geofire-common'

export const toggleUserConnectionStatus = async (userId: string) => {
    try {
        const userRef = doc(users, userId)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) throw Error("[EXP] User does not exist.")

        let status = userDoc.data()['isConnected']
        if (status) {
            status = false
        } else {
            status = true
        }

        updateDoc(userRef, { isConnected: status })
        return true
        
    } catch (error) {
        console.error(error.message)
        return false
    }
}

export const updateUserLocation = async (userId: string, lat: number, lon: number) => {
    try {
        const userRef = doc(users, userId)
        const userDoc = await getDoc(userRef)

        if (!userDoc.exists()) throw Error("[EXP] User does not exist.")

        const hash = geohashForLocation([lat, lon])

        updateDoc(userRef, { lat: lat, lon: lon, geohash: hash })
        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}
