import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const createMessage = async (userId, msgId, msgContent, recievingUserIds) => {
   const newMsgRef = doc(messages, msgId) 
   setDoc(newMsgRef, {
       userId: userId,
       msgId: msgId,
       msgContent: msgContent,
       recievingUserIds: recievingUserIds
   })
}
