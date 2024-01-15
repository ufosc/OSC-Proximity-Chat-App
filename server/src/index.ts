// import express from 'express'
// import 'dotenv/config';
//import { getMessages, getMessageById, getMessagesByBroadCoordinates, getMessagesByBroadCoordsAndTime } from './actions/getMessages'
// import { createMessage } from './actions/createMessage'
// import { deleteMessageById } from './actions/deleteMessage'

// import { getUserById } from './actions/getUsers'
// import { createUser } from './actions/createUser'
// import { updateUserLocation } from './actions/updateUser'
// import { deleteUserById } from './actions/deleteUser'
// import { convertToBroadCoordinates } from './utilities/convertToBroadCoordinates';


import { getNearbyMessages } from "./utilities/getNearbyMessages";
import { Message } from './types/Message';
import { createMessage } from './actions/createMessage';

import express from 'express';
import { deleteMessageById } from "./actions/deleteMessage";
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: any) => {
  console.log('User: ', socket.id, ' connected');

  socket.on('message', (message) => {
    // message post - when someone sends a message
    try{ 
      const timeSent = message.timeSent;
      if(isNaN(timeSent))
        throw new Error("The timeSent parameter must be a valid number.");

      const broadLat = message.broadCoords[0];
      const broadLon = message.broadCoords[1];

      createMessage(
        message.userId,
        message.messageId,
        message.msgContent,
        broadLat,
        broadLon,
        message.specificLat,
        message.specificLon,
        timeSent
      );

      socket.broadcast.to(message.id).emit("verify_message_post", true);

    } catch(err) {
      console.error(`Error sending (message_post) request: ${err.message}`);
      socket.broadcast.to(message.id).emit("verify_message_post", false);

    }
  });
});


// REST functions
app.delete('/messages', async (req, res) => {
    try {
        const regexps = [
            /messages\?msgId=(.*)/,
        ]
        if (regexps[0].test(req.originalUrl)) {
            const msgId = regexps[0].exec(req.originalUrl)[1]
            const messageDeletedSuccessfully = await deleteMessageById(msgId)
            res.json(messageDeletedSuccessfully)
        } else {
            console.error("The request path is in incorrect format");
            res.json(false)
        }
    } catch(err) {
        console.error(`Error sending (DELETE /messages) request: ${err.message}`)
        res.json(false)
    }
})

// This is commented out for now so the code can compile!

// app.post('/users', async (req, res) => {
//     try {
//         await createUser(
//             req.body.userId.toString(),
//             req.body.displayName.toString(),
//             req.body.avatarUrl.toString()
//         )
//         // Sends back true if new user was created!
//         res.json(true)
//     } catch (e) {
//         console.error(`Error sending (POST /users) request: ${e.message}`)
//         res.json(false)
//     }
// })

app.get('/users', async (req, res) => {
    try {
        const regexps = [
            /users\?userId=(.*)/
        ]
        if (regexps[0].test(req.originalUrl)) {
            // Request path: '/users?userId=<userId>'
            const userId = regexps[0].exec(req.originalUrl)[1]
            const returnData = await getUserById(userId);
            res.json(returnData)
        } else {
            console.error("The request path is in incorrect format");
            res.json(false)
        }
    } catch(err) {
        console.error(`Error sending (GET /users) request: ${err.message}`)
        res.json(false)
    }
})

app.delete('/users', async (req, res) => {
    const regexps = [
        /users\?userId=(.*)/
    ]
    try {
        if (regexps[0].test(req.originalUrl)) {
            const userId = regexps[0].exec(req.originalUrl)[1];

            if (typeof userId === "string") {
                const successUserDelete = await deleteUserById(userId)
               
                if (successUserDelete) {
                    res.json(true)
                } else {
                    console.error('User not found, try again!')
                    res.json(false)
                }
            }
        }
    } catch (error) {
        console.error(`Error sending (DELETE /users) request: ${error.message}`)
        res.json(false)
    }
})


httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



// Below are all the current API endpoints
  
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/messages', async (req, res) => {
//     try {
//         // Get messages from Firestore
//         let messages: Message[] | Partial<Message>[] = [];
//         // List of regular expression to parse different types of queries sent to GET API
//         const regexps = [
//             /messages\?msgId=(.*)/,
//             /messages\?broadLat=(-?\d+\.?\d+)&broadLon=(-?\d+\.?\d+)/,
//             /messages\?broadLat=(-?\d+\.?\d+)&broadLon=(-?\d+\.?\d+)&secondsSinceCreation=(\d+)/,
//             /messages\?specificLat=(-?\d+\.?\d+)&specificLon=(-?\d+\.?\d+)&secondsSinceCreation=(\d+)/
//         ]
//         if (req.originalUrl === '/messages') {
//             // Request path: '/messages'
//             messages = await getMessages()
//         } else if (regexps[0].test(req.originalUrl)) {
//             // Request path: '/messages?msgId=<msgId>'
//             const msgId = regexps[0].exec(req.originalUrl)[1]
//             const message: Message = await getMessageById(msgId);
//             if (message) messages.push(message);
//         } else if (regexps[2].test(req.originalUrl)) {
//             // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>&secondsSinceCreation=<secondsSinceCreation>'
//             const broadLat = regexps[2].exec(req.originalUrl)[1]
//             const broadLon = regexps[2].exec(req.originalUrl)[2]
//             const secondsSinceCreation = regexps[2].exec(req.originalUrl)[3]
//             messages = await getMessagesByBroadCoordsAndTime(broadLat, broadLon, Number(secondsSinceCreation))
//         } else if (regexps[1].test(req.originalUrl)) {
//             // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>'
//             const broadLat = regexps[1].exec(req.originalUrl)[1]
//             const broadLon = regexps[1].exec(req.originalUrl)[2]
//             messages = await getMessagesByBroadCoordinates(broadLat, broadLon)
//         } else if (regexps[3].test(req.originalUrl)) {
//             // Request path: '/messages?specificLat=<broadLat>&specificLon=<broadLon>&secondsSinceCreation=<secondsSinceCreation>'
//             const specificLat = regexps[3].exec(req.originalUrl)[1]
//             const specificLon = regexps[3].exec(req.originalUrl)[2]
//             const secondsSinceCreation = Number(regexps[3].exec(req.originalUrl)[3])
//             if (isNaN(secondsSinceCreation)) throw new Error('The secondsSinceCreation parameter must be an integer');
            
//             const broadCoords = convertToBroadCoordinates(specificLat, specificLon);
//             const broadLat = broadCoords[0];
//             const broadLon = broadCoords[1];
//             const broadMessageData = await getMessagesByBroadCoordsAndTime(broadLat, broadLon, secondsSinceCreation);
//             messages = getNearbyMessages(specificLat, specificLon, broadMessageData);
//         } else {
//             console.error("The request path is in incorrect format");
//             res.json(false)
//             return
//         }
//         res.json(messages)
//     } catch (err) {
//         console.error(`Error sending (GET /messages) request: ${err.message}`)
//         res.json(false)
//     }
// })

// app.post('/messages', async (req, res) => {
//     try {
//         // Make sure time is valid before attempting to create message.
//         const timeSent = Number(req.body.timeSent)
//         if(isNaN(timeSent)) throw new Error(`The timeSent parameter must be a valid integer`);

//         const broadCoords: string[] = convertToBroadCoordinates(req.body.specificLat.toString(), req.body.specificLon.toString());
//         const broadLat = broadCoords[0] 
//         const broadLon = broadCoords[1]
        
//         await createMessage(
//             req.body.userId.toString(),
//             req.body.msgId.toString(),
//             req.body.msgContent.toString(),
//             broadLat,
//             broadLon,
//             req.body.specificLat.toString(),
//             req.body.specificLon.toString(),
//             timeSent
//         )
//         res.json(true)
//     } catch (err) {
//         console.error(`Error sending (POST /messages) request: ${err.message}`)
//         res.json(false)
//     }
// })

// app.delete('/messages', async (req, res) => {
//     try {
//         const regexps = [
//             /messages\?msgId=(.*)/,
//         ]
//         if (regexps[0].test(req.originalUrl)) {
//             const msgId = regexps[0].exec(req.originalUrl)[1]
//             const messageDeletedSuccessfully = await deleteMessageById(msgId)
//             res.json(messageDeletedSuccessfully)
//         } else {
//             console.error("The request path is in incorrect format");
//             res.json(false)
//         }
//     } catch(err) {
//         console.error(`Error sending (DELETE /messages) request: ${err.message}`)
//         res.json(false)
//     }
// })

// app.get('/users', async (req, res) => {
//     try {
//         const regexps = [
//             /users\?userId=(.*)/
//         ]
//         if (regexps[0].test(req.originalUrl)) {
//             // Request path: '/users?userId=<userId>'
//             const userId = regexps[0].exec(req.originalUrl)[1]
//             const returnData = await getUserById(userId);
//             res.json(returnData)
//         } else {
//             console.error("The request path is in incorrect format");
//             res.json(false)
//         }
//     } catch(err) {
//         console.error(`Error sending (GET /users) request: ${err.message}`)
//         res.json(false)
//     }
// })

// app.post('/users', async (req, res) => {
//     try {
//         await createUser(
//             req.body.userId.toString(),
//             req.body.displayName.toString(),
//             req.body.avatarUrl.toString()
//         )
//         // Sends back true if new user was created!
//         res.json(true)
//     } catch (e) {
//         console.error(`Error sending (POST /users) request: ${e.message}`)
//         res.json(false)
//     }
// })

// // Updates user location so far, going to add updating and checking messages in next push
// app.put('/users', async (req, res) => {
//     try {
//         // /users?userId=<userId>&specificLat=<specificLat>&specificLon=<specificLon>
//         const regexps = [
//             /users\?userId=(.*)&specificLat=(-?\d+\.?\d+)&specificLon=(-?\d+\.?\d+)/
//         ]
//         if (regexps[0].test(req.originalUrl)) {
//             const userId = regexps[0].exec(req.originalUrl)[1];
//             const specificLat = regexps[0].exec(req.originalUrl)[2];
//             const specificLon = regexps[0].exec(req.originalUrl)[3];
//             const successUserUpdate = await updateUserLocation(
//                     String(userId),
//                     String(specificLat),
//                     String(specificLon)
//             )

//             if (successUserUpdate) {
//                 res.json(true)
//             } else {
//                 console.error('User not found, try again!')
//                 res.json(false)
//             }
//         } 
//     } catch (error) {
//         console.error(`Error sending (PUT /users) request: ${error.message}`)
//         res.json(false)
//     }
// })

// app.delete('/users', async (req, res) => {
//     const regexps = [
//         /users\?userId=(.*)/
//     ]
//     try {
//         if (regexps[0].test(req.originalUrl)) {
//             const userId = regexps[0].exec(req.originalUrl)[1];

//             if (typeof userId === "string") {
//                 const successUserDelete = await deleteUserById(userId)
               
//                 if (successUserDelete) {
//                     res.json(true)
//                 } else {
//                     console.error('User not found, try again!')
//                     res.json(false)
//                 }
//             }
//         }
//     } catch (error) {
//         console.error(`Error sending (DELETE /users) request: ${error.message}`)
//         res.json(false)
//     }
// })

// // Error handling
// app.get('*', (req, res) => {
//     // res.json("404: Path could not be found! COULD NOT {GET}")
//     res.json(false)
//     res.status(404)
// })

// app.post('*', (req, res) => {
//     // res.json("404: Path could not be found! COULD NOT {POST}")
//     res.json(false)
//     res.status(404)
// })

// app.put('*', (req, res) => {
//     // res.json("404: Path could not be found! COULD NOT {PUT}")
//     res.json(false)
//     res.status(404)
// })

// app.delete('*', (req, res) => {
//    // res.json("404: Path could not be found! COULD NOT {DELETE}")
//    res.json(false)
//    res.status(404)
// })
