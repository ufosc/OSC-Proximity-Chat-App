// Uploads a new document in the Messages collection.
import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'
import { Message } from '../types/Message'
import { messagesCollection } from '../utilities/adminInit'

export const createMessage = async (msg : Message) => {
  try {
    await messagesCollection.doc(msg.msgId).set(msg)
    return true

  } catch (error) {
    console.error(error.message)
    return false
  }
}
