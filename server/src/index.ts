import express from 'express'
import { getMessages, getMessagesbyID, getMessagesbyCoordinates, getMessagesSpecificCoordinates, getMessagesbyBroadCoordinates } from './actions/getMessages'
import { createMessage } from './actions/createMessage'

const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/messages', async (req, res) => {
    // get messages from fb
    const messages = await getMessages()
    res.json(messages)
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

// ### TESTING ENDPOINTS ###

// Get a message by msgID
app.get('/messages/:msgID', async (req, res) => {
    const response = await getMessagesbyID(Number(req.params.msgID))
    res.json(response)
})

// Get a message by longitude and latitude
app.get('/messages/:lat/:lon', async (req, res) => {
    let coordinates = [Number(req.params.lat), Number(req.params.lon)]
    const response = await getMessagesbyCoordinates(coordinates)
    res.json(response)

})

// Testing coordinateBoundariesCalculation
app.get("/messages/specific/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)
    const specificCoords = await getMessagesSpecificCoordinates([lat, lon])
    res.json(specificCoords)
})

app.get("/messages/broad/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await getMessagesbyBroadCoordinates([lat, lon])
    res.json(response)
})

// ######

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})
