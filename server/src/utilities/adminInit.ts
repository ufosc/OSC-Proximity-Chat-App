const admin = require('firebase-admin');
const serviceAccount = require("../../src/private_key/private.json");

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const connectedUsersCollection = db.collection('ConnectedUsers');
export const messagesCollection = db.collection('Messages');

console.log("[FIREBASE-ADMIN] Firebase admin SDK synced.")

// TODO: refactor file name to 'firebase' for accuracy.
// TODO: move key info to .env
