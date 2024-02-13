// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types/Message';

const socket_test_client_port = process.env.socket_test_client_port;
console.log("Socket clients are listening on port", socket_test_client_port)

const SECONDS_TIMEOUT = 10;
const SECONDS_MULTIPLIER = 1000;
const NUM_CLIENTS = 10; // Adjust the number of clients as needed. Do not go over 300 to prevent being blocked by Firebase.
const exampleMsg: Message = {
    uid: "USER ID",
    msgId: "MESSAGE ID",
    msgContent: "MESSAGE CONTENT",
    timeSent: 9999,
    location: {
        lat: 10,
        lon: 10
        // Geohash will be calculated by the server since it is not included with the message.
    }
}

jest.setTimeout(SECONDS_TIMEOUT * SECONDS_MULTIPLIER);

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const connectClients = async () => {
  const clients = [];

  for (let i = 0; i < NUM_CLIENTS; i++) {
    const client = io(`http://localhost:${socket_test_client_port}`);
    await new Promise(resolve => client.on('connect', resolve)); // Why is this an error? IDK
    clients.push(client);
  }

  return clients;
};

const disconnectClients = (clients) => {
  clients.forEach(client => client.disconnect());
};

describe('socket-load-tests', () => {
  let clients;

  beforeAll(async () => {
    clients = await connectClients();
  });

  afterAll(() => {
    disconnectClients(clients);
  });

  test('Simultaneous Ping', async () => {
    const pingPromises = clients.map(client => new Promise(resolve => client.emit('ping', resolve)));
    const responses = await Promise.all(pingPromises);

    responses.forEach(response => {
      expect(response).toBe('pong');
    });
  });

  test('Simultaneous Message', async () => {
    let count = 0;
    const messagePromises = clients.map(client => {
      return new Promise(async resolve => {
        client.emit('message', exampleMsg, resolve);
        count++;
        await sleep(200)
      });
    });

    const responses = await Promise.all(messagePromises);
    responses.forEach(response => {
      expect(response).toBe('message recieved');
    });
  })
});

describe("socket-tests", () => {
    let user1, user2, user3, user4, user5
    let userList = [user1, user2, user3, user4, user5]
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
        user1.emit('message', exampleMsg, (response) => {
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
        sleep(5000)
        done()
    })
    test('Send message to user', async (done) => {
        const user2Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        const user2Message: Message = {
            uid: user2.id, // a socket id
            msgId: "MESSAGE ID",
            msgContent: "omggg hi!!!! :3",
            timeSent: 9999,
            location: {
                lat: user2Coords.lat,
                lon: user2Coords.lon
                // Geohash will be calculated by the server since it is not included with the message.
            }
        }
        user1.on('message', (message) => {
            console.log(`User 2 recieved message: ${message}`)
            expect(message).toBe("omggg hi!!!! :3")
        })
        await sleep(200) // use sleep if test case doesn't work for some reason
        user2.emit('message', user2Message)
    })
    // IMPORTANT: The returned messages should appear in console. The correct way to use expect() has not been figured out yet for this test.
    // TODO: Find a way for expect() to be verified after messages return. 
})
