// Uploads a new document in the ConnectedUsers collection.
import { ConnectedUser } from '../types/User'
<<<<<<< HEAD
import { connectedUsersCollection } from '../utilities/adminInit';
=======
import { connectedUsersCollection } from '../utilities/firebaseInit';
>>>>>>> a15bd2c79af0ae980877f70f54f541fc55ae7ff0

export const createUser = async (connectedUser: ConnectedUser) => {
  try {
    await connectedUsersCollection.doc(connectedUser.socketId).set(connectedUser)
    console.log('User added to the database')
  } catch (error) {
    console.error(error.message)
    return false
  }
}
