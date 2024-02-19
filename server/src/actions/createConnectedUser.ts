// Uploads a new document in the ConnectedUsers collection.
import { doc, setDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'
import { ConnectedUser } from '../types/User'
import { connectedUsersCollection } from '../utilities/adminInit';

export const createUser = async (connectedUser: ConnectedUser) => {
  try {
    await connectedUsersCollection.doc(connectedUser.socketId).set(connectedUser)
    console.log('User added to the database')
  } catch (error) {
    console.error(error.message)
    return false
  }
}
