import express from 'express';
import { getMessages } from './actions/getMessages'
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

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`)
})

