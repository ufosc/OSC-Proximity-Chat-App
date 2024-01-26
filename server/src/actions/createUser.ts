// Uploads a new document in the Users collection.
import { doc, setDoc } from '@firebase/firestore'
import { users } from '../utilities/firebaseInit'

export const createUser = async (displayName: string, userId: string, avatarUrl: string, lat: number, lon: number, geohash: string) => {
   const newMsgRef = doc(users, userId) 
   const docData = {
       displayName: displayName,
       userId: userId,
       avatarUrl: avatarUrl,
       lat: lat,
       lon: lon,
       geohash: geohash,
       isConnected: false
   } 

   await setDoc(newMsgRef, docData)
}
