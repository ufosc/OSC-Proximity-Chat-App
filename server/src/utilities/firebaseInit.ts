import { initializeApp } from 'firebase/app'
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'
import 'dotenv/config';

export const firebaseApp = initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
})

export const firestore = getFirestore()

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
}

import { Message } from '../types/Message'
import { ConnectedUser, UserConfig } from '../types/User'

export const messages = createCollection<Message>('Messages')
export const connectedUsers = createCollection<ConnectedUser>('ConnectedUsers')
export const userConfigs = createCollection<UserConfig>('UserConfigs')

console.log("[FIRESTORE] Database synced.")

