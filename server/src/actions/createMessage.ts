import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'
import { Message } from '../types/Message'

export const createMessage = async (msg:Message) => {
   const newMsgRef = doc(messages, msg.msgId)
   const docData = {
       userId: msg.userId,
       msgId: msg.msgId,
       msgContent: msg.msgContent,
       lat: msg.lat,
       lon: msg.lon,
       geohash: msg.geohash,
       timeSent: msg.timeSent
   }

   await setDoc(newMsgRef, docData)
}
