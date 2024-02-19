// Delete a ConnectedUser document given a document's index. This should typically be a socketId, but it can also be something else.
import { doc, getDoc, deleteDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'
import { connectedUsersCollection } from '../utilities/adminInit'

export const deleteConnectedUserByUID = async (userID: string) => {
  try {
    await connectedUsersCollection.doc(userID).delete()
    return true
        
  } catch (error) {
    console.error(error.message)
    return false
  }
}
