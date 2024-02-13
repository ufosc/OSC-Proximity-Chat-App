// Uploads a new document in the Messages collection.
import { doc, setDoc } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'
import { Message } from '../types/Message'

export const createMessage = async (msg : Message) => {
  try {
    const ref = doc(messages, msg.msgId)
    const status = await setDoc(ref, msg)
    return true

  } catch (error) {
    console.error(error.message)
    return false
  }
}
