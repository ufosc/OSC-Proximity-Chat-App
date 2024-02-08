// Uploads a new document in the ConnectedUsers collection.
import { doc, setDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'
import { ConnectedUser } from '../types/User'

export const createUser = async (connectedUser: ConnectedUser) => {
  try {
    const ref = doc(connectedUsers, connectedUser.socketId) // Use the socketid as the index
    await setDoc(ref, connectedUser)
    return true

  } catch (error) {
    console.error(error.message)
    return false
  }
}
