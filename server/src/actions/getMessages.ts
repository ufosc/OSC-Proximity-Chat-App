import { doc, getDoc, getDocs } from '@firebase/firestore'
import { messages } from '../utilities/firebaseInit'
import { coordinateBoundariesCalculation } from '../utilities/coordinateBoundariesCalculation'

export const getMessages = async () => {
  const messageDocs = await getDocs(messages)
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
  })

  return messageObjs;
}

export const getMessageById = async (msgId) => {
  const msgRef = doc(messages, msgId)
  const msgDoc = await getDoc(msgRef)

  if (msgDoc.exists()) {
      return msgDoc.data()
  } else {
      // This is false return is caught in index.ts to send an error back to the requesting client.
      return false
  }
}

// ## TESTING ACTIONS (refer to bottom of index.ts) ##

// getMessagesBySpecificCoordinates and getMessagesByBroadCoordinates currently just return coordinates,
// however these will be modified to return messages, per their function signitures.
export const getMessagesBySpecificCoordinates = async (coords: Array<number>) => {
  let response = await coordinateBoundariesCalculation(coords[0], coords[1])
}

export const getMessagesByBroadCoordinates = async (coords: Array<number>) => {
  let lat = coords[0]
  let lon = coords[1]

  // Digits is how many numbers behind the decimal point
  // Why did we choose 2? Refer to documentation! (I will write docs in a few weeks)
  let digits = 2

  let newLat = Math.trunc(lat*Math.pow(10, digits))/Math.pow(10, digits)
  let newLon = Math.trunc(lon*Math.pow(10, digits))/Math.pow(10, digits)

  let response = `Broad coords are Latitiude: ${newLat} and Longitude: ${newLon}`
  return response
}
