// Uploads a new document in the Messages collection.
import { Message } from '../types/Message'
<<<<<<< HEAD
import { messagesCollection } from '../utilities/adminInit'
=======
import { messagesCollection } from '../utilities/firebaseInit'
>>>>>>> a15bd2c79af0ae980877f70f54f541fc55ae7ff0

export const createMessage = async (msg : Message) => {
  try {
    await messagesCollection.doc(msg.msgId).set(msg)
    return true

  } catch (error) {
    console.error(error.message)
    return false
  }
}
