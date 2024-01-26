import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { users } from '../utilities/firebaseInit'
import { geohashForLocation} from 'geofire-common'

export const toggleUserConnectionStatus = async (userId: string) => {
    const userRef = doc(users, userId)
    const userDoc = await getDoc(userRef)

    let status = userDoc.data()['isConnected']
    if (status) {
        status = false
    } else {
        status = true
    }

    updateDoc(userRef, { isConnected: status })
    return true
}

export const updateUserLocation = async (userId: string, lat: number, lon: number) => {
    const userRef = doc(users, userId)
    const userDoc = await getDoc(userRef)

    const hash = geohashForLocation([lat, lon])

    updateDoc(userRef, { lat: lat, lon: lon, geohash: hash })
    return true
}
