// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
const socket_test_client_port = process.env.socket_test_client_port;
console.log(socket_test_client_port)

describe("socket-tests", () => {
    let socket
    let user1, user2

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
            console.log(response)
            expect(response).toBe('message recieved')
            done()
        })
    })
    test('Update location', (done) => {
        socket.emit('updateLocation', { lat: 77, lon: 77 }, (response) => {
            expect(response).toBe('location updated')
            done()
        })
    })
    test('Send message to user', (done) => {
        const user2Lat = 29.6489354
        const user2Lon = -82.3447749 // Note slightly different lon from user1
        const user2Message = {
            userId: user2.id,
            messageId: "MESSAGEID",
            msgContent: "omggg hi!!!! :3",
            lat: user2Lat,
            lon: user2Lon,
            timeSent: 999999
        }

        user1.emit('updateLocation', {lat: 29.6489354, lon: -82.3441252}) // Turlington Plaza
        user2.emit('updateLocation', {lat: user2Lat, lon: user2Lon })
        user1.on('message', (message, ack) => {
            console.log(`User 2 recieved message ${message}`)
            ack("hii")
        })
        user2.emit('message', user2Message, (response) => {
            expect(response).toBe("hii")
            done()
        })
    })
})
