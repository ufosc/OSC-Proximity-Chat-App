// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
const socket_test_client_port = process.env.socket_test_client_port;
console.log("Socket clients are listening on port", socket_test_client_port)

describe("socket-tests", () => {
    let socket
    let user1, user2
    let user2Id

    beforeAll((done) => {
        socket = io(`http://localhost:${socket_test_client_port}`)
        socket.on('connect', done)
        user1 = io(`http://localhost:${socket_test_client_port}`)
        user1.on('connect', done)
        user2 = io(`http://localhost:${socket_test_client_port}`)
        user2.on('connect', done)
    })

    afterAll(() => {
        socket.disconnect()
        user1.disconnect()
        user2.disconnect()
    })

    test('Ping', (done) => {
        socket.emit('ping', (response) => {
            expect(response).toBe('pong')
            done()
        })
    })
    test('Send message', (done) => {
        const msgObject = {
            userId: "userId",
            messageId: "hiii 33 :3",
            msgContent: "messageContent",
            lat: 10,
            lon: 10,
            timeSent: 99999999
        }
        socket.emit('message', msgObject, (response) => {
            expect(response).toBe('message recieved')
            done()
        })
    })
    test('Update locations', (done) => {
        const user1Coords = { lat: 29.64888, lon: -82.34420 } // Turlington Hall pin on Google Maps
        const user2Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        user1.emit('updateLocation', user1Coords, (response) => {
            expect(response).toBe("location updated")
        }) 
        user2.emit('updateLocation', user2Coords, (response) => {
            expect(response).toBe("location updated")
        })
        done()
    })
    test('Send message to user', async (done) => {
        const user2Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        const user2Message = {
            userId: user2.id,
            messageId: "testid",
            msgContent: "omggg hi!!!! :3",
            timeSent: 999999,
            lat: user2Coords.lat,
            lon: user2Coords.lon
        }
        let res = ""
        await user1.on('message', (message, response) => {
            console.log(`User 2 recieved message ${message}`)
            console.log(response)
            expect(message).toBe("omggg hi!!!! :3")
        })
        if (res == "location updated") {
            user2.emit('message', user2Message, (response) => {
                console.log(response)
            })
        }
    })
})
