import { initializeApp } from 'firebase/app'
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore'
import 'dotenv/config'

// Make sure that config is up to date in /.env
console.log(process.env.apiKey)
export const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
})

export const firestore = getFirestore()

// Helper function for fetching firebase collections to be saved locally
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

// Import types
import { Message } from '../types/Message'

// export all your collections
export const messages = createCollection<Message>('messages')

console.log("Database initated.")
