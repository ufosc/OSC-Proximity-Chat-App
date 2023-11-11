import { doc, deleteDoc} from '@firebase/firestore'
import { messages, firestore } from '../utilities/firebaseInit'

export const deleteMessageById = async (msgId: string) => {
  const msgRef = doc(messages, msgId)
  const msgDoc = await deleteDoc(msgRef)

  return true
  // if (msgDoc.exists()) {
  //     return msgDoc.data()
  // } else {
  //     // If no data is returned, index.ts will notice and throw an error accordingly.
  //     return
  // }
}

