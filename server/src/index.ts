import express from 'express'
import ngrok from '@ngrok/ngrok'
import 'dotenv/config';
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
        res.json(true)
    } catch (e) {
        console.error(e.message);
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

// ### TESTING ENDPOINTS ###

// For message objects

// Get message obj by broad coordinates
app.get("/messages/get/broad/:lat/:lon", async (req, res) => {
    let lat = Number(req.params.lat)
    let lon = Number(req.params.lon)

    const response = await convertToBroadCoordinates([lat, lon])
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
  // Create a domain using ngrok that the frontend can access but that
 // isn't a public domain where our backend is deployed.   
    const start_ngrok = async () => {
        // Establish connectivity
        const listener = await ngrok.connect({
            addr: port,
            authtoken: process.env.NGROK_AUTH_TOKEN,
            domain: process.env.NGROK_DOMAIN
        });
        return listener;
    };

    start_ngrok().then((listener) => {
        // Output ngrok url to console
        console.log(`Ingress established at: ${listener.url()}`);
    }).catch((error) => console.error(error));
})
