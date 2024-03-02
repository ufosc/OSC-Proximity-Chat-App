import { connectedUsersCollection } from '../utilities/firebaseInit'

export const getConnectedUserDisplayName = async (socketID: string) => {
    try {
        return connectedUsersCollection.doc(socketID).displayName; 
    } catch (error) {
        console.error(error);
        return null;
    }
}

