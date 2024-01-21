// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
const socket_test_client_port = process.env.socket_test_client_port;
console.log(socket_test_client_port)

describe("socket-tests", () => {
    let clientSocket

    beforeAll((done) => {
        clientSocket = io(`http://localhost:${socket_test_client_port}`)
        clientSocket.on('connect', done)
    })

    afterAll(() => {
        clientSocket.disconnect();
    })

    test('ping', (done) => {
        clientSocket.emit('ping', (arg) => {
            expect(arg).toBe('pong')
            done()
        })
    })
})
