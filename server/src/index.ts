import express from 'express'
import 'dotenv/config';

// import { Message } from './types/Message';
import { createMessage } from './actions/createMessage'
// import { deleteMessageById } from './actions/deleteMessage'
// import { getUserById } from './actions/getUsers'
// import { createUser } from './actions/createUser'
// import { deleteUserById } from './actions/deleteUser'

const { createServer } = require('http')
const { Server } = require('socket.io')

const socket_port = process.env.socket_port
const express_port = process.env.express_port
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// === SOCKET API ===

const socketServer = createServer()
const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: any) => {

  //   let userLocation = {
  //       latitude: 0.0,
  //       longitude: 0.0
  //   }
  //
  console.log(`[ALERT] User <${socket.id}> connected.`);
  //
  socket.on('disconnect', () => {
      console.log(`[ALERT] User <${socket.id}> exited.`);
  })
  socket.on('ping', (cb) => {
      console.log(`[ALERT] Recieved ping from user <${socket.id}>.`)
      cb('pong')
  })
  // socket.on('message', (message) => {
  //   // message post - when someone sends a message
  //   try{
  //     const timeSent = message.timeSent
  //     if(isNaN(timeSent))
  //       throw new Error("The timeSent parameter must be a valid number.")
  //
  //     createMessage(
  //       message.userId,
  //       message.messageId,
  //       message.msgContent,
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       timeSent
  //     ); // TODO: import these parameters from the message type.
  //
  //     socket.broadcast.to(socket.id).emit("verify_message_post", true)
  //
  //   } catch(err) {
  //     console.error(`Error sending (message_post) request: ${err.message}`)
  //     socket.broadcast.to(socket.id).emit("verify_message_post", false)
  //
  //   }
  // })
})



socketServer.listen(socket_port, () => {
  console.log(`[INFO] Listening for websockets on port ${socket_port}.`)
})

// === REST APIs === 

app.get('/', (req, res) => {
    res.send("Echologator API")
})

// Error handling
app.get('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {GET}")
    res.status(404)
})

app.post('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {POST}")
    res.status(404)
})

app.put('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {PUT}")
    res.status(404)
})

app.delete('*', (req, res) => {
   res.json("404: Path could not be found! COULD NOT {DELETE}")
   res.status(404)
})

app.listen(express_port, () => {
    return console.log(`[INFO] Express is listening for requests at http://localhost:${express_port}.`)
})

// Some old API routes are commented out for now due to breaking type changes.

// REST functions
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

// app.delete('/users', async (req, res) => {
//     const regexps = [
//         /users\?userId=(.*)/
//     ]
//     try {
//         if (regexps[0].test(req.originalUrl)) {
//             const userId = regexps[0].exec(req.originalUrl)[1];
//
//             if (typeof userId === "string") {
//                 const successUserDelete = await deleteUserById(userId)
//
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

