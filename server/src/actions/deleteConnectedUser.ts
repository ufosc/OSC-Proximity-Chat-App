// Delete a ConnectedUser document given a document's index. This should typically be a socketId, but it can also be something else.
import { doc, getDoc, deleteDoc } from '@firebase/firestore'
import { connectedUsers } from '../utilities/firebaseInit'

export const deleteConnectedUserByIndex = async (index: string) => {
  try {
    const userRef = doc(connectedUsers, index)

    // The promise returned by deleteDoc will be fulfilled (aka return 'true') both if the document requested for deletion exists or doesn't exist. It is rejected if the program is unable to send this request to Firestore.
    // Therefore, we need to check to see if the document exists first, to most accurately know if it will be deleted.
    // However, technically, there could be some kind of failure by deleteDoc after this check is performed, where the status of the deletion would then be inaccurately returned.
    // TODO: find a way to assuredly know if a document is deleted after deleteDoc is called.

    const userDoc = await getDoc(userRef)
    if (!userDoc.exists()) throw Error("[FIREBASE] User does not exist.")

    await deleteDoc(userRef)
    return true
        
  } catch (error) {
    console.error(error.message)
    return false
  }
}
