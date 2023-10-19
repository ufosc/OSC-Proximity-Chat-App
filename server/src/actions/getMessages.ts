import { getDocs } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'

export const getMessages = async () => {
  const messageDocs = await getDocs(messages)
  const messageObjs = [];

  messageDocs.docs.forEach((doc) => {
    const data = doc.data()
    const messageObj = {
        userId: data.userId,
        msgId: data.msgId,
        msgContent: data.msgContent,
        recievingUserIds: data.recievingUserIds
        
    }
    messageObjs.push(messageObj);
  })

  return messageObjs;
}