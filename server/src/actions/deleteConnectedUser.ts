// Delete a ConnectedUser document given a document's index. This should typically be a socketId, but it can also be something else.
import { connectedUsersCollection } from '../utilities/firebaseInit'

export const deleteConnectedUserByUID = async (socketID: string) => {
    await connectedUsersCollection.doc(socketID).delete()
}
