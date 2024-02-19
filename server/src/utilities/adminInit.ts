const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require("../../src/private_key/private.json");

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const connectedUsersCollection = db.collection('users');
export const messagesCollection = db.collection('messages');

console.log("[FIREBASE-ADMIN] Firebase admin SDK synced.")