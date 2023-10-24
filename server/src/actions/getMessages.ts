import { doc, getDoc, getDocs, collection, query, where } from '@firebase/firestore'
import { messages, firestore } from '../utilities/firebaseInit'
import { calculateCoordinateBoundaries } from '../utilities/calculateCoordinateBoundaries'

export const getMessages = async () => {
  const messageDocs = await getDocs(messages)
  let messagesReceived = 0
  const messageObjs = [];

  messageDocs.docs.forEach((doc) => {
    const data = doc.data()
    const messageObj = {
        userId: data.userId,
        msgId: data.msgId,
        msgContent: data.msgContent,
        recievingUserIds: data.recievingUserIds
    }
    messageObjs.push(messageObj);

    // This section adds to the message counter and returns if 100 messages have been received!
    messagesReceived++
    if (messagesReceived >= 100) {
      return messageObjs;
    }

  })

  return messageObjs;
}

export const getMessageById = async (msgId: string) => {
  const msgRef = doc(messages, msgId)
  const msgDoc = await getDoc(msgRef)

  if (msgDoc.exists()) {
      return msgDoc.data()
  } else {
      // If no data is returned, index.ts will notice and throw an error accordingly.
      return 
  }
}

export const getMessagesByBroadCoordinates = async (broadLat: string, broadLon: string) => {
  const msgsRef = collection(firestore, "messages")
  const q = query(msgsRef, where("broadLat", "==", broadLat), where("broadLon", "==", broadLon))
  const matches = await getDocs(q)
  const messageObjs = []

  matches.forEach((doc) => {
      const data = doc.data()
      const messageObj = {
          userId: data.userId,
          msgId: data.msgId,
          msgContent: data.msgContent,
          recievingUserIds: data.recievingUserIds,
          broadLat: data.broadLat,
          broadLon: data.broadLon,
          specificLat: data.specificLat,
          specificLon: data.specificLon,
          timeSent: data.timeSent
      }
      messageObjs.push(messageObj)
  })
  return messageObjs
}

export const getMessagesByBroadCoordsandTime = async (broadLat: string, broadLon: string, timeFrame: number) => {
  const msgsRef = collection(firestore, "messages")
  const timeNow = Date.now()
  const q = query(msgsRef, 
    where("broadLat", "==", broadLat), 
    where("broadLon", "==", broadLon),
    where("timeSent", ">=", timeNow - timeFrame)
  )

  const matches = await getDocs(q)
  const messageObjs = []

  matches.forEach((doc) => {
    const data = doc.data()
    const messageObj = {
        userId: data.userId,
        msgId: data.msgId,
        msgContent: data.msgContent,
        recievingUserIds: data.recievingUserIds,
        broadLat: data.broadLat,
        broadLon: data.broadLon,
        specificLat: data.specificLat,
        specificLon: data.specificLon,
        timeSent: data.timeSent
    }
    messageObjs.push(messageObj)
})
return messageObjs
  
}

// ## TESTING ACTIONS (refer to bottom of index.ts) ##

// FIXME: getMessagesBySpecificCoordinates currently just returns coordinates,
// however these should be modified to return messages, per their function signitures.
export const getMessagesBySpecificCoordinates = async (coords: Array<number>) => {
  let response = await calculateCoordinateBoundaries(coords[0], coords[1])
}
