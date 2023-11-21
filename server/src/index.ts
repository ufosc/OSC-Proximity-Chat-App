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

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/messages', async (req, res) => {
    // Get messages from Firestore
    let returnData = null

    if (req.query.msgId) {
        // Request path: '/messages?msgId=<msgId>'
        // Return message object with matching Id

        const msgId = req.query.msgId
        if (typeof msgId === "string") {
            returnData = await getMessageById(msgId)
        }
    } else if (req.query.broadLat && req.query.broadLon && req.query.secondsSinceCreation) {
        // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>&secondsSinceCreation=<secondsSinceCreation>'

        const broadLat = req.query.broadLat
        const broadLon = req.query.broadLon
        const secondsSinceCreation = req.query.secondsSinceCreation
        if (typeof broadLat === "string" && typeof broadLon === "string" && typeof req.query.secondsSinceCreation === "string") {
            // It's possible that secondsSinceCreation cannot be converted to a number, so a try/catch is used here.
            try {
                returnData = await getMessagesByBroadCoordsAndTime(broadLat, broadLon, Number(secondsSinceCreation))
                // If no data is returned, return null for error checks
                if (returnData.length === 0) returnData = null
            } catch (e) {
                returnData = null
            }
        }
    } else if (req.query.broadLat && req.query.broadLon) {
        // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>'

        const broadLat = req.query.broadLat
        const broadLon = req.query.broadLon
        if (typeof broadLat === "string" && typeof broadLon === "string") {
            returnData = await getMessagesByBroadCoordinates(broadLat, broadLon)
            // If no data is returned, return null for error checks
            if (returnData.length === 0) returnData = null
        }
    } else {
        // Request path: '/messages'
        returnData = await getMessages()
    }

    // Error checking for all queries under /messages. Client should recognize 'false' and act accordingly.
    if (returnData === null) {
        // Returnfalse error to client
        res.json(false)
    } else {
        res.json(returnData)
    }
    return
})

app.post('/messages', async (req, res) => {
    try {
        // Make sure time is valid before attempting to create message.
        const timeSent = Number(req.body.timeSent)
        if(isNaN(timeSent)) throw Error;

        const broadCoordinates: number[] = convertToBroadCoordinates([req.body.specificLat, req.body.specificLon]);
        const broadLat = `${broadCoordinates[0]}`; 
        const broadLon = `${broadCoordinates[1]}`;

        await createMessage(
            req.body.userId,
            req.body.msgId,
            req.body.msgContent,
            broadLat,
            broadLon,
            `${req.body.specificLat}`,
            `${req.body.specificLon}`,
            timeSent
        )
        // Send back "true" if message was successfully created.
        console.log('Created!')
        res.json(true)
    } catch (e) {
        console.log(e)
        console.log("Error: (POST /messages) request sent with incorrect data format.")
        res.json(false)
    }
})

app.delete('/messages', async (req, res) => {
    let returnData = null

    if (req.query.msgId) {
        try {
            const msgId = req.query.msgId
            if (typeof msgId === "string") {
                returnData = await deleteMessageById(msgId)
            }
        } catch(e) {
            console.log("Error:")
            console.log(e)
        }
    }

    if (returnData === null) {
        // Return error to client
        res.json(false)
    } else {
        res.json(returnData)
    }
    return
})

app.get('/users', async (req, res) => {
    let returnData = null

    if (req.query.userId) {
        // Request path: '/users?userId=<userId>'
        try {
            const userId = req.query.userId
            if (typeof userId === "string") {
                returnData = await getUserById(userId)
            } 
        } catch(e) {
            console.log("Error:")
            console.log(e)
        }
    }

    if (returnData === null) {
        // Return error to client
        res.json(false)
    } else {
        res.json(returnData)
    }
    return
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
    } catch (error) {
        console.log("Error: (POST /users) request sent with incorrect data format.")
        res.json(false)
    }
})

// Updates user location so far, going to add updating and checking messages in next push
app.put('/users', async (req, res) => {
    // /users?userId=<userId>&specificLat=<specificLat>&specificLon=<specificLon>
    if (req.query.userId && req.query.specificLat && req.query.specificLon) {
        try {
            const successUserUpdate = await updateUserLocation(
                String(req.query.userId),
                String(req.query.specificLat),
                String(req.query.specificLon)
            )

            if (successUserUpdate) {
                res.json(true)
            } else {
                res.json('User not found, try again!')
            }
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    }
})

app.delete('/users', async (req, res) => {
    let returnData = null

    if (req.query.userId) {
        try {
            const userId = req.query.userId
            if (typeof userId === "string") {
                returnData = await deleteUserById(userId)
            }
        } catch(e) {
            console.log("Error:")
            console.log(e)
        }
    }

    if (returnData === null) {
        // Return error to client
        res.json(false)
    } else {
        res.json(returnData)
    }
    return
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
