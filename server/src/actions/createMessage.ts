import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const createMessage = async (userId: string, msgId: string, msgContent: string, broadLat: string, broadLon: string, specificLat: string, specificLon: string, timeSent: Number) => {
   const newMsgRef = doc(messages, msgId) 
   const docData = {
       userId: userId,
       msgId: msgId,
       msgContent: msgContent,
       broadLat: broadLat,
       broadLon: broadLon,
       specificLat: specificLat,
       specificLon: specificLon,
       timeSent: timeSent
   }

   setDoc(newMsgRef, docData)
}
