// import { getDocs } from '@firebase/firestore'
// import { messages } from '../utilities/firebaseInit'

// export const getMessages = async () => {
//   const messageDocs = await getDocs(messages)
//   const messageObjs = [];

//   messageDocs.docs.forEach((doc) => {
//     const data = doc.data()
//     const messageObj = {
//         userId: data.userId,
//         msgId: data.msgId,
//         msgContent: data.msgContent,
//         recievingUserIds: data.recievingUserIds
        
//     }
//     messageObjs.push(messageObj);
//   })

//   return messageObjs;
// }









// // -------------------------- TESTING ACTIONS ---------------------- refer to bottom of index.ts

// export const getMessagesbyID = async (msgID: number) => {
//   let printMsgId = `Your msgID is ${msgID}`
//   return printMsgId
// }

// export const getMessagesbyCoordinates = async (coords: Array<number>) => {
//   let lon = coords[0]
//   let lat = coords[1]
//   let searchingCoords = `Looking for messages at LON: ${lon}, LAT: ${lat}`
//   return searchingCoords
// }

// export const getMessagesBroadCoordinates = async (coords: Array<number>) => {
  
// }