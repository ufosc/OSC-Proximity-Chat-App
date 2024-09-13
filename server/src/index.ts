import express from "express";
import "dotenv/config";
import "geofire-common";
import { Message } from "./types/Message";
import { createMessage } from "./actions/createMessage";
import { createUser } from "./actions/createConnectedUser";
import {
  toggleUserConnectionStatus,
  updateUserLocation,
  updateUserDisplayName,
} from "./actions/updateConnectedUser";
import { deleteConnectedUserByUID } from "./actions/deleteConnectedUser";
import { findNearbyUsers, getConnectedUser } from "./actions/getConnectedUsers";
import { geohashForLocation } from "geofire-common";
import { ConnectedUser } from "./types/User";
import { getAuth } from "firebase-admin/auth";
import Mailgun from "mailgun.js";
import { messagesCollection } from "./utilities/firebaseInit";
import { calculateDistanceInMeters } from "./actions/calculateDistance";
import { scheduleCron } from "./actions/deleter";
import mainRouter from "./routes/mainRouteHandler";

const { createServer } = require("http");
const { Server } = require("socket.io");
const socket_port = process.env.socket_port;
const express_port = process.env.express_port;
const message_outreach_radius = Number(process.env.message_outreach_radius);
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === SOCKET API ===
const socketServer = createServer();
const io = new Server(socketServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Firebase JWT Authorization Custom Middleware
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(`[WS] Recieved token: ${token}`);

  if (token) {
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;
    console.log(`[WS] User <${userId}> authenticated.`);
    console.log(decodedToken);

    next();
  } else {
    console.error("[WS] User not authenticated.");
    next(new Error("User not authenticated."));
  }
});

io.on("connection", async (socket: any) => {
  console.log(`[WS] User <${socket.id}> connected.`);
  const defaultConnectedUser: ConnectedUser = {
    uid: "UID",
    socketId: socket.id,
    location: {
      lat: 9999,
      lon: 9999,
      geohash: "F",
    },
  }; // TODO: Send this info from client on connection
  await createUser(defaultConnectedUser);
  await toggleUserConnectionStatus(socket.id);

  const observer = messagesCollection
    .orderBy('lastUpdated', "desc")
    .limit(1)
    .onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New message: ", change.doc.data());

          const messageLat = change.doc.data().location.lat;
          const messageLon = change.doc.data().location.lon;

          const userLat = defaultConnectedUser.location.lat;
          const userLon = defaultConnectedUser.location.lon;

          const distance = calculateDistanceInMeters(
            messageLat,
            messageLon,
            userLat,
            userLon
          );

          if (distance < message_outreach_radius) {
            console.log(`Message is within ${message_outreach_radius} meters of the user ${socket.id}.`);
            socket.emit("message", change.doc.data());
          } else {
            console.log(`Message is not within ${message_outreach_radius} meters of the user ${socket.id}.`);
          }
        }
      });
  });

  socket.on("disconnect", () => {
    console.log(`[WS] User <${socket.id}> exited.`);
    try {
      deleteConnectedUserByUID(socket.id);
    } catch (error) {
      console.error(
        `[WS] Error disconnecting user <${socket.id}>.\n\t`,
        error.message
      );
    }
  });
  socket.on("ping", (ack) => {
    // The (ack) parameter stands for "acknowledgement." This function sends a message back to the originating socket.
    console.log(`[WS] Recieved ping from user <${socket.id}>.`);
    if (ack) ack("pong");
  });
  socket.on("message", async (message: Message, ack) => {
    // message post - when someone sends a message

    try {
      const messageCreated = await createMessage(message);
      if (!messageCreated) throw new Error("createMessage() failed.");
      if (ack) ack("message recieved");  
    } catch (error) {
      console.error("[WS] Error sending message:", error.message);
    }
  });
  socket.on("updateLocation", async (location, ack) => {
    console.log(`[WS] Recieved new location from user <${socket.id}>.`);
    let lat: number, lon: number;
    try {
      lat = Number(location.lat);
      lon = Number(location.lon);
    } catch {
      console.error("[WS] Error calling updateLocation: Invalid [lat/lon].");
      return;
    }
    defaultConnectedUser.location.lat = lat;
    defaultConnectedUser.location.lon = lon;
    try {
      await updateUserLocation(socket.id, lat, lon);
    } catch (error) {
      console.error("[WS] Error calling updateLocation:", error.message);
      return;
    }
    console.log("[WS] Location updated in database successfully.");
    if (ack) ack("location updated");
  });
});
socketServer.listen(socket_port, () => {
  console.log(`[WS] Listening for new connections on port ${socket_port}.`);
});

// === REST APIs ===

app.get("/", (req, res) => {
  res.send("Echologator API");
});


app.use(mainRouter);


app.listen(express_port, () => {
  return console.log(
    `[EXP] Listening for requests at http://localhost:${express_port}.`
  );
});



//Remove the comments if you want to use the deleter !!!!!!
//scheduleCron(); // Begin searching and collecting Garbage (old messages)

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
