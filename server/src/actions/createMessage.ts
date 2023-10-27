import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const createMessage = async (userId, msgId, msgContent, recievingUserIds) => {
   const newMsgRef = doc(messages, msgId) 
   setDoc(newMsgRef, {
       userId: userId,
       msgId: msgId,
       msgContent: msgContent,
       broadLat: "0",
       broadLon: "0",
       specificLat: "0",
       specificLon: "0",
       timeSent: Date.now()
       // FIXME: Time should be passed in by client
   })
}
