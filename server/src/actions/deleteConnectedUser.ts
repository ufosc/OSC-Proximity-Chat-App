// Delete a ConnectedUser document given a document's index. This should typically be a socketId, but it can also be something else.
<<<<<<< HEAD
import { connectedUsersCollection } from '../utilities/adminInit'
=======
import { connectedUsersCollection } from '../utilities/firebaseInit'
>>>>>>> a15bd2c79af0ae980877f70f54f541fc55ae7ff0

export const deleteConnectedUserByUID = async (socketID: string) => {
  try {
    await connectedUsersCollection.doc(socketID).delete()
    return true
        
  } catch (error) {
    console.error(error.message)
    return false
  }
}
