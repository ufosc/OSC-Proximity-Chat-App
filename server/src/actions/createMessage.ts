import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const createMessage = async (userId, msgId, msgContent, broadLat, broadLon, specificLat, specificLon, timeSent) => {
   const newMsgRef = doc(messages, msgId) 
   setDoc(newMsgRef, {
       userId: userId,
       msgId: msgId,
       msgContent: msgContent,
       broadLat: broadLat,
       broadLon: broadLon,
       specificLat: specificLat,
       specificLon: specificLon,
       timeSent: timeSent
   })
}
