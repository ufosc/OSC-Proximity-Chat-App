// Uploads a new document in the Messages collection.
import { Message } from '../types/Message'
import { messagesCollection } from '../utilities/firebaseInit'

export const createMessage = async (msg : Message) => {
  try {
    await messagesCollection.doc(msg.msgId).set(msg)
    return true

  } catch (error) {
    console.error(error.message)
    return false
  }
}
