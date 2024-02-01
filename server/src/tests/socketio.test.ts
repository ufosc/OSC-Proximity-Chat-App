// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
const socket_test_client_port = process.env.socket_test_client_port;
console.log("Socket clients are listening on port", socket_test_client_port)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("socket-tests", () => {
    let user1, user2
    let user2Id

    beforeAll((done) => {
        user1 = io(`http://localhost:${socket_test_client_port}`)
        user1.on('connect', done)
        user2 = io(`http://localhost:${socket_test_client_port}`)
        user2.on('connect', done)
    })

    afterAll(() => {
        user1.disconnect()
        user2.disconnect()
    })

    test('Ping', (done) => {
        user1.emit('ping', (response) => {
            expect(response).toBe('pong')
            done()
        })
    })
    test('Send message', (done) => {
        const msgObject = {
            userId: "userId",
            msgId: "hiii 33 :3",
            msgContent: "messageContent",
            lat: 10,
            lon: 10,
            timeSent: 99999999
        }
        user1.emit('message', msgObject, (response) => {
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
    test('Send message to user', async () => {
        const user2Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        const user2Message = {
            userId: user2.id,
            msgId: "testid",
            msgContent: "omggg hi!!!! :3",
            lat: user2Coords.lat,
            lon: user2Coords.lon,
            timeSent: 999999
        }
        user1.on('message', (message) => {
            console.log(`User 2 recieved message ${message}`)
            expect(message).toBe("omggg hi!!!! :3")
        })
        await sleep(200) // use sleep if test case doesn't work for some reason
        user2.emit('message', user2Message)
    })
})
