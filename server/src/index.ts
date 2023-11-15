import express from 'express'
import 'dotenv/config';
import { getMessages, getMessageById, getMessagesByBroadCoordinates, getMessagesByBroadCoordsAndTime } from './actions/getMessages'
import { createMessage } from './actions/createMessage'
import { deleteMessageById } from './actions/deleteMessage'

import { getUserById } from './actions/getUsers'
import { createUser } from './actions/createUser'
import { updateUserLocation } from './actions/updateUser'
import { deleteUserById } from './actions/deleteUser'
import { convertToBroadCoordinates } from './utilities/convertToBroadCoordinates';
import { getNearbyMessages } from "./utilities/getNearbyMessages";

import { Message } from './types/Message';

const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/messages', async (req, res) => {
    try {
        // Get messages from Firestore
        let messages: Message[] | Partial<Message>[] = [];
        // List of regular expression to parse different types of queries sent to GET API
        const regexps = [
            /messages\?msgId=(.*)/,
            /messages\?broadLat=(\d+\.?\d*)&broadLon=(\d+\.?\d?)/,
            /messages\?broadLat=(\d+\.?\d*)&broadLon=(\d+\.?\d?)&secondsSinceCreation=(\d+)/,
            /messages\?specificLat=(\d+\.?\d*)&specificLon=(\d+\.?\d?)&secondsSinceCreation=(\d+)/
        ]
        if (req.originalUrl === '/messages') {
            // Request path: '/messages'
            messages = await getMessages()
        } else if (regexps[0].test(req.originalUrl)) {
            // Request path: '/messages?msgId=<msgId>'
            const msgId = /messages?msgId=/
            if (typeof msgId === "string") {
                const message: Message = await getMessageById(msgId);
                if (message) messages.push(message);
            }
        } else if (regexps[1].test(req.originalUrl)) {
            // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>'
            const broadLat = regexps[1].exec(req.originalUrl)[1]
            const broadLon = regexps[1].exec(req.originalUrl)[2]
            messages = await getMessagesByBroadCoordinates(broadLat, broadLon)
        } else if (regexps[2].test(req.originalUrl)) {
            // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>&secondsSinceCreation=<secondsSinceCreation>'
            const broadLat = regexps[2].exec(req.originalUrl)[1]
            const broadLon = regexps[2].exec(req.originalUrl)[2]
            const secondsSinceCreation = regexps[2].exec(req.originalUrl)[3]
            messages = await getMessagesByBroadCoordsAndTime(broadLat, broadLon, Number(secondsSinceCreation))
        } else if (regexps[3].test(req.originalUrl)) {
            // Request path: '/messages?specificLat=<broadLat>&specificLon=<broadLon>&secondsSinceCreation=<secondsSinceCreation>'
            const specificLat = regexps[3].exec(req.originalUrl)[1]
            const specificLon = regexps[3].exec(req.originalUrl)[2]
            const secondsSinceCreation = Number(regexps[3].exec(req.originalUrl)[3])
            if (isNaN(secondsSinceCreation)) throw new Error('The secondsSinceCreation parameter must be an integer');
            
            const broadCoords = convertToBroadCoordinates(specificLat, specificLon);
            const broadLat = broadCoords[0];
            const broadLon = broadCoords[1];
            const broadMessageData = await getMessagesByBroadCoordsAndTime(broadLat, broadLon, secondsSinceCreation);
            messages = await getNearbyMessages(specificLat, specificLon, broadMessageData);
        } else {
            console.error("The request path is in incorrect format");
            res.json(false)
            return
        }
        res.json(messages)
    } catch (err) {
        console.error(`Error sending (GET /messages) request: ${err.message}`)
        res.json(false)
    }
})

app.post('/messages', async (req, res) => {
    try {
        // Make sure time is valid before attempting to create message.
        const timeSent = Number(req.body.timeSent)
        if(isNaN(timeSent)) throw new Error(`The timeSent parameter must be a valid integer`);

        const broadCoords: string[] = convertToBroadCoordinates(req.body.specificLat.toString(), req.body.specificLon.toString());
        const broadLat = broadCoords[0] 
        const broadLon = broadCoords[1]
        
        await createMessage(
            req.body.userId.toString(),
            req.body.msgId.toString(),
            req.body.msgContent.toString(),
            broadLat,
            broadLon,
            req.body.specificLat.toString(),
            req.body.specificLon.toString(),
            timeSent
        )
        res.json(true)
    } catch (err) {
        console.error(`Error sending (POST /messages) request: ${err.message}`)
        res.json(false)
    }
})

app.delete('/messages', async (req, res) => {
    try {
        if (req.query.msgId) {
            const msgId = req.query.msgId
            if (typeof msgId === "string") {
                let messageDeletedSuccessfully = await deleteMessageById(msgId)
                res.json(messageDeletedSuccessfully)
            } 
        }
    } catch(err) {
        console.error(`Error sending (DELETe /messages) request: ${err.message}`)
        res.json(false)
    }
})

app.get('/users', async (req, res) => {
    const regexps = [
        /users\?userId=(.*)/
    ]
    try {
        if (regexps[0].test(req.originalUrl)) {
            // Request path: '/users?userId=<userId>'
            const userId = regexps[0].exec(req.originalUrl)[0]
            const returnData = await getUserById(userId);
            res.json(returnData)
        }
    } catch(err) {
        console.error(`Error sending (GET /users) request: ${err.message}`)
        res.json(false)
    }
})

app.post('/users', async (req, res) => {
    try {
        await createUser(
            req.body.userId,
            req.body.displayName,
            req.body.avatarUrl
        )
        // Sends back true if new user was created!
        res.json(true)
    } catch (e) {
        console.error(`Error sending (POST /users) request: ${e.message}`)
        res.json(false)
    }
})

// Updates user location so far, going to add updating and checking messages in next push
app.put('/users', async (req, res) => {
    try {
        // /users?userId=<userId>&specificLat=<specificLat>&specificLon=<specificLon>
        const regexps = [
            /users\?userId=(.*)&broadLon=(\d+\.?\d?)&specificLon=(\d+\.?\d?)/
        ]
        if (regexps[0].test(req.originalUrl)) {
            const userId = regexps[0].exec(req.originalUrl)[0];
            const specificLat = regexps[0].exec(req.originalUrl)[1];
            const specificLon = regexps[0].exec(req.originalUrl)[2];
            const successUserUpdate = await updateUserLocation(
                    String(userId),
                    String(specificLat),
                    String(specificLon)
            )

            if (successUserUpdate) {
                res.json(true)
            } else {
                res.json('User not found, try again!')
            }
        } 
    } catch (error) {
        console.error(`Error sending (PUT /users) request: ${error.message}`)
        res.json(false)
    }
})

app.delete('/users', async (req, res) => {
    try {
        if (/users\?userId=(.*)/.test(req.originalUrl)) {
            const userId = req.query.userId
            if (typeof userId === "string") {
                const returnData = await deleteUserById(userId)
                res.json(returnData)
            }
        }
    } catch (error) {
        console.log(`Error sending (DELETE /users) request: ${error.message}`)
        res.json(false)
    }
})

// Error handling
app.get('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {GET}")
    res.json(false)
    res.status(404)
})

app.post('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {POST}")
    res.json(false)
    res.status(404)
})

app.put('*', (req, res) => {
    // res.json("404: Path could not be found! COULD NOT {PUT}")
    res.json(false)
    res.status(404)
})

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
