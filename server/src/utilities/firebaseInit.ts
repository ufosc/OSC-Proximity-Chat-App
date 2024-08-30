const admin = require('firebase-admin');
const serviceAccount = require("../../firebase-secrets.json");

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const connectedUsersCollection = db.collection('ConnectedUsers');
export const messagesCollection = db.collection('Messages');

console.log("[FIREBASE] Firestore synced.")

// TODO: refactor file name to 'firebase' for accuracy.
// TODO: move key info to .env
