import express from 'express'
import { getMessages, getMessagesbyID, getMessagesbyBroadCoordinates } from './actions/getMessages'
import { getNearbyUsers } from './actions/getUsers'
import { createMessage } from './actions/createMessage'

const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/messages/get', async (req, res) => {
    // get messages from fb
    const messages = await getMessages()
    res.json(messages)
})

app.post('/messages/create/new', async (req, res) => {
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

// Get message obj by msgID
app.get('/messages/get/:msgID', async (req, res) => {
    const response = await getMessagesbyID(Number(req.params.msgID))
    res.json(response)
})

// Get message obj by broad coordinates
app.get("/messages/get/broad/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await getMessagesbyBroadCoordinates([lat, lon])
    res.json(response)
})

// For user objects

app.get("/users/get/specificRange/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await getNearbyUsers([lat, lon])

    res.json(response)
})

// ####

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
