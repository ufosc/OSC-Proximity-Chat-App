// Delete a ConnectedUser document given a document's index. This should typically be a socketId, but it can also be something else.
import { connectedUsersCollection } from '../utilities/firebaseInit'

export const deleteConnectedUserByUID = async (socketID: string) => {
  try {
    await connectedUsersCollection.doc(socketID).delete()
    return true
        
  } catch (error) {
    console.error(error.message)
    return false
  }
}
