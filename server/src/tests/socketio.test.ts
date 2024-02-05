// Testing for socket.io endpoints

import { io as io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

const socket_test_client_port = process.env.socket_test_client_port;
console.log("Socket clients are listening on port", socket_test_client_port)
const SECONDS_MULTIPLIER = 1000;
jest.setTimeout(60 * SECONDS_MULTIPLIER);

const numClients = 100; // Adjust the number of clients as needed. Do not go over 300 to prevent being blocked by Firebase.

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const connectClients = async () => {
  const clients = [];

  for (let i = 0; i < numClients; i++) {
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
        client.emit('message', { userId: "userId", msgId: uuidv4(), msgContent: `This is message ${count}`, lat: 10, lon: 10, timeSent: 99999999 }, resolve);
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
        user3 = io(`http://localhost:${socket_test_client_port}`)
        user3.on('connect', done)
        user4 = io(`http://localhost:${socket_test_client_port}`)
        user4.on('connect', done)
        user5 = io(`http://localhost:${socket_test_client_port}`)
        user5.on('connect', done)
    })

    afterAll(() => {
        user1.disconnect()
        user2.disconnect()
        user3.disconnect()
        user4.disconnect()
        user5.disconnect()
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
        const user3Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        const user4Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        const user5Coords = { lat: 29.64881, lon: -82.34429 } // 8.65 meters SW of user 1
        user1.emit('updateLocation', user1Coords, (response) => {
            expect(response).toBe("location updated")
        }) 
        user2.emit('updateLocation', user2Coords, (response) => {
            expect(response).toBe("location updated")
        })
        user3.emit('updateLocation', user3Coords, (response) => {
            expect(response).toBe("location updated")
        })
        user4.emit('updateLocation', user4Coords, (response) => {
            expect(response).toBe("location updated")
        })
        user5.emit('updateLocation', user5Coords, (response) => {
            expect(response).toBe("location updated")
        })
        done()
    })
    test('Send message to user', async (done) => {
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
        user3.on('message', (message) => {
            console.log(`User 2 recieved message ${message}`)
            expect(message).toBe("omggg hi!!!! :3")
        })
        user4.on('message', (message) => {
            console.log(`User 2 recieved message ${message}`)
            expect(message).toBe("omggg hi!!!! :3")
        })
        user5.on('message', (message) => {
            console.log(`User 2 recieved message ${message}`)
            expect(message).toBe("omggg hi!!!! :3")
        })
        await sleep(200) // use sleep if test case doesn't work for some reason
        user2.emit('message', user2Message)
    })
    // TODO: Find a way for expect() to be verified after messages return.
})
