import express from 'express'
import 'dotenv/config'
import 'geofire-common'

import { Message } from './types/Message';

import { createMessage } from './actions/createMessage'
// import { deleteMessageById } from './actions/deleteMessage'
// import { getUserById } from './actions/getUsers'
import { createUser } from './actions/createConnectedUser'
import { toggleUserConnectionStatus, updateUserLocation } from './actions/updateConnectedUser'
import { deleteConnectedUserByIndex } from './actions/deleteConnectedUser'
import {geohashForLocation} from 'geofire-common';
import { findNearbyUsers } from './actions/getConnectedUsers'
import { ConnectedUser } from './types/User';

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
  console.log(`[WS] User <${socket.id}> connected.`);
  const defaultConnectedUser: ConnectedUser = {
      uid: "UID",
      socketId: socket.id,
      displayName: "DISPLAY NAME",
      userIcon: { 
        foregroundImage: "FOREGROUND IMG",
        backgroundImage: "BACKGROUND IMG"
      },
      location: {
        lat: 9999,
        lon: 9999,
        geohash: "F"
      }
  } // TODO: Send this info from client on connection  
  createUser(defaultConnectedUser) 
  toggleUserConnectionStatus(socket.id)

  socket.on('disconnect', () => {
      console.log(`[WS] User <${socket.id}> exited.`);
      deleteConnectedUserByIndex(socket.id)
  })
  socket.on('ping', (ack) => {
  // The (ack) parameter stands for "acknowledgement." This function sends a message back to the originating socket.
      console.log(`[WS] Recieved ping from user <${socket.id}>.`)
      if (ack) ack('pong')      
  })
  socket.on('message', async (message: Message, ack) => {
    // Runs when a user sends a message
    console.log(`[WS] Recieved message from user <${socket.id}>.`)
    console.log(message)
    try {
      if(isNaN(message.timeSent)) throw new Error("The timeSent parameter must be a valid number.")
      if(isNaN(message.location.lat)) throw new Error("The lat parameter must be a valid number.")
      if(isNaN(message.location.lon)) throw new Error("The lon parameter must be a valid number.")

      if (message.location.geohash == undefined || message.location.geohash === "") {
        message.location.geohash = geohashForLocation([Number(message.location.lat), Number(message.location.lon)])
        console.log(`New geohash generated: ${message.location.geohash}`)
      }

      const status = await createMessage(message); 
      if(status === false) throw new Error("Error creating message: ")

      // Get nearby users and push the message to them.
      const nearbyUserSockets = await findNearbyUsers(Number(message.location.lat), Number(message.location.lon), Number(process.env.message_outreach_radius))
      for (const recievingSocket of nearbyUserSockets) {
        // Don't send the message to the sender (who will be included in list of nearby users).
        if (recievingSocket === socket.id) {
          continue
        } else {
          console.log(`Sending new message to socket ${recievingSocket}`)
          socket.broadcast.to(recievingSocket).emit("message", message.msgContent)
          // socket.broadcast.to(recievingSocket).emit("message", message)
        }
      }

      if (ack) ack("message recieved")

    } catch(error) {
      console.error("[WS] Error sending message:", error.message)
    }
  })
  socket.on('updateLocation', async (message, ack) => {
    console.log(`[WS] Recieved new location from user <${socket.id}>.`)
    try {
      const lat = Number(message.lat)
      const lon = Number(message.lon)
      const success = await updateUserLocation(socket.id, lat, lon)
      if (success) {
        console.log("[WS] Location updated in database successfully.")
        if (ack) ack("location updated")
      } else {
        throw new Error("updateUserLocation() failed.")
      }
    } catch (error) {
      console.error("[WS] Error calling updateLocation:", error.message)
    }
  })
})

socketServer.listen(socket_port, () => {
  console.log(`[WS] Listening for new connections on port ${socket_port}.`)
})

// === REST APIs ===

app.get('/', (req, res) => {
    res.send("Echologator API")
})

app.get('/users', async (req, res) => {
  let query = ''
  try {
    if (req.query.lat && req.query.lon && req.query.radius) {
      // Looks up all users close to a geographic location extended by a radius (in meters).
      query = "?lat&lon&radius"

      const lat = Number(req.query.lat)
      const lon = Number(req.query.lon)
      const radius = Number(req.query.radius)
      
      const userIds = await findNearbyUsers(lat, lon, radius)
      console.log(userIds)
      res.json(userIds)
    }
  } catch(error) {
    console.error(`[EXP] Error returning request <GET /users${query}>:\n`, error.message)
    res.json(`Operation <GET /users${query}> failed.`)
  }
})

app.post('/users', async (req, res) => {
    try {
        const status = await createUser({
          uid: req.body.uid,
          socketId: req.body.socketId,
          displayName: req.body.displayName,
          userIcon: { 
            foregroundImage: req.body.userIcon.foregroundImage,
            backgroundImage: req.body.userIcon.backgroundImage,
          },
          location: {
            lat: Number(req.body.location.lat),
            lon: Number(req.body.location.lon),
            geohash: req.body.location.geohash,
          }
        }) 
        if (status === false) throw new Error("Error creating user: ")
        res.json("Operation <POST /user> was handled successfully.")
        console.log("[EXP] Request <POST /users> returned successfully.")
    } catch (error) {
        console.error("[EXP] Error returning request <POST /users>:\n", error.message)
        res.json(`Operation <POST /user> failed.`)
    }
})

app.put('/users', async (req, res) => {
  let query = ""
  try {
    if (req.query.userId && req.query.toggleConnection) {
      // Note: toggleConnection should be assigned 'true', but it at least needs to contain any value. We don't perform a check on this parameter for this reason.
      query = "?userId&toggleConnection"
      const userId = req.query.userId
      if (typeof userId != "string") throw Error("  [userId] is not a string.")

      const success = await toggleUserConnectionStatus(userId)
      if (!success) throw Error("     toggleUserConnectionStatus() failed.")
    }
    else if(req.query.userId && req.query.lat && req.query.lon) {
      const userId = req.query.userId
      const lat = Number(req.query.lat)
      const lon = Number(req.query.lon)
      if (typeof userId != "string") throw Error("  [userId] is not a string.")
      if (typeof lat != "number") throw Error("  [lat] is not a number.")
      if (typeof lon != "number") throw Error("  [lon] is not a number.")

      const success = await updateUserLocation(userId, lat, lon)
      if (!success) throw Error("     toggleUserConnectionStatus() failed.")
    }
    console.log(`[EXP] Request <PUT /users${query}> returned successfully.`)
    res.json(`Operation <PUT /user${query}> was handled successfully.`)

  } catch (error) {
    console.error(`[EXP] Error returning request <PUT /users${query}>:\n`, error.message)
    res.json(`Operation <PUT /user${query}> failed.`)
  }
})

app.delete('/users', async (req, res) => {
  let query = ""
  try {
    query = "?userId"
    const userId = req.query.userId
    if (typeof userId != "string") throw Error("  [userId] is not a string.")

    const success = await deleteConnectedUserByIndex(userId)
    if (!success) throw Error("     deleteUserById() failed.")

    console.log(`[EXP] Request <DELETE /users${query}> returned successfully.`)
    res.json(`Operation <DELETE /users${query}> was handled successfully.`)
  } catch (error) {
    console.error(`[EXP] Error returning request <DELETE /users${query}>:\n`, error.message)
    res.json(`Operation <DELETE /user${query}> failed.`)
  }
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
    return console.log(`[EXP] Listening for requests at http://localhost:${express_port}.`)
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

