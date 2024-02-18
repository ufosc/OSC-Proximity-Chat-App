const { initializeApp } = require('firebase-admin/app');
const admin = require('firebase-admin');
const serviceAccount = require("../../src/private_key/<YOUR KEY>.json");

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("[FIREBASE-ADMIN] Firebase admin SDK synced.")