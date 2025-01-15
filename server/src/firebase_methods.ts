import firebase from "firebase-admin";

export const initFirebase = () => {
    const serviceAccount = require("../firebase-secrets.json");
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    });
}

export const ensureUserAuthorized = async (token: any): Promise<[uid: string | undefined, error: string | undefined]> => {
    if (!token) {
        return [undefined, "User not authenticated!"];
    }

    var uid: string;
    try {
        const decodedToken = await firebase.auth().verifyIdToken(token);
        uid = decodedToken.uid;
        return [uid, undefined];
    } catch (e) {
        console.log(`[WS] Error while verifying user auth token: ${e}`);
        return [undefined, "User id token is invalid!"];
    }
}

export const getUserProfile = async (uid: string): Promise<firebase.firestore.DocumentData | undefined> => {
    const userProfileSnapshot = await firebase.firestore().collection('users').doc(uid).get();
    return userProfileSnapshot.data();
}