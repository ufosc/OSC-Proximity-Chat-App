import express, { json } from 'express'
import { getMessages, getMessageById, getMessagesByBroadCoordinates, getMessagesByBroadCoordsAndTime } from './actions/getMessages'
import { convertToBroadCoordinates } from './utilities/convertToBroadCoordinates'
import { getNearbyUsers } from './actions/getUsers'
import { createMessage } from './actions/createMessage'
import { createUser } from './actions/createUsers'
import { updateUserLocation } from './actions/updateUser'

const app = express()
const port = 3000
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
        // Return error to client
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

        await createMessage(
            req.body.userId,
            req.body.msgId,
            req.body.msgContent,
            req.body.broadLat,
            req.body.broadLon,
            req.body.specificLat,
            req.body.specificLon,
            timeSent
        )
        // Send back "true" if message was successfully created.
        res.json(true)
    } catch (e) {
        console.log("Error: (POST /messages) request sent with incorrect data format.")
        res.json(false)
    }
})

app.post('/users', async (req, res) => {
    if (req.body) {
        try {
            await createUser(
                req.body.userId,
                req.body.userDisplayName
            )
            // Sends back true if new user was created!
            res.json(true)
        } catch (error) {
            console.log(error)
            res.json(false)
        }
    } else {
        console.log('Body doesnt exist LOL')
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

// Error handling
app.get('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {GET}")
})

app.post('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {POST}")
})

app.put('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {PUT}")
})

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
