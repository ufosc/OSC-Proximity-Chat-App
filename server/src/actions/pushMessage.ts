// Pushes a new message to clients near its location on database updates.
// Note: this could become a Cloud Function when we think about running a production server.

import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { messages, users, firestore } from '../utilities/firebaseInit'

const q = query(
    collection(firestore, "messages"),
    orderBy('geohash'),
)

