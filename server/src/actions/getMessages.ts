import { getDocs } from '@firebase/firestore'
import { messages } from '../scripts/firebaseInit'

export const getMessages = async () => {
  const messageDocs = await getDocs(messages)

  messageDocs.docs.forEach((messageDoc) => {
    const message = messageDoc.data()
    console.log(messageDoc)
    // console.log(messageDoc.userId)
    // console.log(messageDoc.msgId)
    // console.log(messageDoc.msgContent)
  })
}
