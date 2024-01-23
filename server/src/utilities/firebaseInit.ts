import { initializeApp } from 'firebase/app';
import { getFirestore, CollectionReference, collection, DocumentData } from 'firebase/firestore';
import 'dotenv/config';

export const firebaseApp = initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
});

export const firestore = getFirestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

import { Message } from '../types/Message';
import { User } from '../types/User';

export const messages = createCollection<Message>('messages');
export const users = createCollection<User>('users');

console.log("Database synced");


