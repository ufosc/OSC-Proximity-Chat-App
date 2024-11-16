import firebase from "firebase-admin";

export const ensureUserAuthorized = async (token: any): Promise<[uid: string | undefined, error: string | undefined]> => {
    if (!token) {
        return [undefined, "User not authenticated!"];
    }

    var uid: string;
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token);
        uid = decodedToken.uid;
        return [uid, undefined];
    } catch {
        return [undefined, "User id token is invalid!"];
    }
}

export const getUserProfile = async (uid: string): Promise<firebase.firestore.DocumentData | undefined> => {
    return {
        displayName: "Test Display Name",
        profilePicture: 12,
    }
    const userProfileSnapshot = await firebase.firestore().collection('users').doc(uid).get();
    return userProfileSnapshot.data();
}