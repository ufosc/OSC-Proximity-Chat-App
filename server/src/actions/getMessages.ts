import { doc, getDoc, getDocs, query } from '@firebase/firestore'
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
  // TODO: query Firestore for messages with matching broad coords
  const msgRef = doc(messages)
  const msgDoc = await getDoc(msgRef)
    
}

// ## TESTING ACTIONS (refer to bottom of index.ts) ##

// getMessagesBySpecificCoordinates and getMessagesByBroadCoordinates currently just return coordinates,
// however these will be modified to return messages, per their function signitures.
export const getMessagesBySpecificCoordinates = async (coords: Array<number>) => {
  let response = await coordinateBoundariesCalculation(coords[0], coords[1])
}

// export const getMessagesByBroadCoordinates = async (coords: Array<number>) => {
//   let lat = coords[0]
//   let lon = coords[1]
//
//   // Digits is how many numbers behind the decimal point
//   // Why did we choose 2? Refer to documentation! (I will write docs in a few weeks)
//   let digits = 2
//
//   let newLat = Math.trunc(lat*Math.pow(10, digits))/Math.pow(10, digits)
//   let newLon = Math.trunc(lon*Math.pow(10, digits))/Math.pow(10, digits)
//
//   let response = `Broad coords are Latitiude: ${newLat} and Longitude: ${newLon}`
//   return response
// }
