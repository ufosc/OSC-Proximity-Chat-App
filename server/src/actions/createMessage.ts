import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const createMessage = async (userId: string, msgId: string, msgContent: string, lat: number, lon: number, timeSent: Number) => {
   const newMsgRef = doc(messages, msgId) 
   const docData = {
       userId: userId,
       msgId: msgId,
       msgContent: msgContent,
       lat: lat,
       lon: lon,
       timeSent: timeSent
   } // TODO: import these parameters from the message type

   setDoc(newMsgRef, docData)
}
