import express from 'express'
import { getMessages, getMessageById, getMessagesByBroadCoordinates } from './actions/getMessages'
import { getNearbyUsers } from './actions/getUsers'
import { createMessage } from './actions/createMessage'

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
        returnData = await getMessageById(req.query.msgId)
    } else if (req.query.broadLat && req.query.broadLon) {
        // Request path: '/messages?broadLat=<broadLat>&broadLon=<broadLon>'
        const broadLat = req.query.broadLat
        const broadLon = req.query.broadLon
        returnData = await getMessagesByBroadCoordinates(broadLat, broadLon)
    } else {
        // Request path: '/messages'
        const returnData = await getMessages()
        // Return here to prevent error check for other paths.
    }

    // Error checking for all paths. Client will recognize 'false' and act accordingly.
    if (returnData === null) {
        // Return error to client
        res.json(false)
    } else {
        res.json(returnData)
    }
    return
})

app.post('/messages/new', async (req, res) => {
    try {
        await createMessage(
            req.body.userId,
            req.body.msgId,
            req.body.msgContent,
            req.body.recievingUserIds
        )
        // Send back "true" if message was successfully created.
        res.json(true)
    } catch (e) {
        console.log("/messages/new: request sent with incorrect data format.")
        res.json(false)
    }
})

// Error handling
app.get('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {GET}")
})

app.post('*', (req, res) => {
    res.json("404: Path could not be found! COULD NOT {POST}")
})

// ### TESTING ENDPOINTS ###

// For message objects

// Get message obj by broad coordinates
app.get("/messages/get/broad/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await getMessagesByBroadCoordinates([lat, lon])
    res.json(response)
})

// For user objects

app.get("/users/get/specificRange/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await getNearbyUsers([lat, lon])

    res.json(response)
})

// ######

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
