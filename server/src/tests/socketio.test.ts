// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
const socket_test_client_port = process.env.socket_test_client_port;
console.log(socket_test_client_port)

describe("socket-tests", () => {
    let socket

    beforeAll((done) => {
        socket = io(`http://localhost:${socket_test_client_port}`)
        socket.on('connect', done)
    })

    afterAll(() => {
        socket.disconnect();
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
        socket.emit('updateLocation', { lat: 77, lon: 77 } , (response) => {
            expect(response).toBe('location updated')
            done()
        })
    })
})
