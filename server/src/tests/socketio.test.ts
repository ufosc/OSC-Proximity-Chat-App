// Testing for socket.io endpoints

import { createServer } from "node:http";
import { io as ioc } from "socket.io-client";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const SECONDS_MULTIPLIER = 1000;
jest.setTimeout(60 * SECONDS_MULTIPLIER);

describe("socket-load-tests", () => {
  let clientSockets = [];
  let httpServer;
  let httpServerAddr;
  let ioServer;
  const numClients = 20; // Adjust the number of clients as needed. Do not go over 300 to prevent being blocked by Firebase.

  beforeAll((done) => {
    httpServer = createServer().listen();
    httpServerAddr = httpServer.address();
    ioServer = new Server(httpServer);
    for (let i = 0; i < numClients; i++) {
      let clientSocket = ioc(
        `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
        {
          forceNew: true,
          reconnectionDelay: 0,
          transports: ["websocket"],
        }
      );
      clientSocket.on("connect", () => {
        done();
      });
      clientSockets.push(clientSocket);
    }
    done();
  });

  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    for (let i = 0; i < numClients; i++) {
      clientSockets[i].disconnect();
    }
    done();
  });

  test("Simultaneous Ping", (done) => {
    ioServer.on("ping", (cb) => {
      cb("pong");
    });
    for (let i = 0; i < numClients; i++) {
      clientSockets[i].emit("ping", (response) => {
        expect(response).toBe("pong");
      });
    }
    done();
  });

  test("Simultaneous Message", async () => {
    ioServer.on("ping", (cb) => {
      cb("pong");
    });
    for (let i = 0; i < numClients; i++) {
      clientSockets[i].emit(
        "message",
        {
          userId: "userId",
          msgId: uuidv4(),
          msgContent: `This is message ${i}`,
          lat: 10,
          lon: 10,
          timeSent: 99999999,
        },
        (response) => {
          expect(response).toBe("message recieved");
        }
      );
    }
  });
});

describe("socket-tests", () => {
  let clientSockets = [];
  let httpServer;
  let httpServerAddr;
  let ioServer;
  const numClients = 5;

  beforeAll((done) => {
    httpServer = createServer().listen();
    httpServerAddr = httpServer.address();
    ioServer = new Server(httpServer);
    for (let i = 0; i < numClients; i++) {
      let clientSocket = ioc(
        `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
        {
          reconnectionDelay: 0,
          forceNew: true,
          transports: ["websocket"],
        }
      );
      clientSocket.on("connect", () => {
        done();
      });
      clientSockets.push(clientSocket);
    }
    done();
  });

  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    for (let i = 0; i < numClients; i++) {
      clientSockets[i].disconnect();
    }
    done();
  });

  test("Ping", (done) => {
    ioServer.on("ping", (cb) => {
      cb("pong");
    });
    clientSockets[0].emit("ping", (response) => {
      expect(response).toBe("pong");
    });
    done();
  });

  test("Send message", (done) => {
    ioServer.on("ping", (cb) => {
      cb("pong");
    });
    const msgObject = {
      userId: "userId",
      msgId: "hiii 33 :3",
      msgContent: "messageContent",
      lat: 10,
      lon: 10,
      timeSent: 99999999,
    };
    clientSockets[0].emit("message", msgObject, (response) => {
      expect(response).toBe("message recieved");
    });
    done();
  });

  test("Update locations", (done) => {
    const userCoords = [
      { lat: 29.64888, lon: -82.3442 }, // Turlington Hall pin on Google Maps
      { lat: 29.64881, lon: -82.34429 }, // 8.65 meters SW of user 1
      { lat: 29.64881, lon: -82.34429 }, // 8.65 meters SW of user 1
      { lat: 29.64881, lon: -82.34429 }, // 8.65 meters SW of user 1
      { lat: 29.64881, lon: -82.34429 }, // 8.65 meters SW of user 1
    ];

    for (let i = 0; i < userCoords.length; i++) {
      clientSockets[i].emit("updateLocation", userCoords[0], (response) => {
        expect(response).toBe("location updated");
      });
    }
    done();
  });

  test("Send message to user", (done) => {
    const user2Coords = { lat: 29.64881, lon: -82.34429 }; // 8.65 meters SW of user 1
    const user2Message = {
      userId: clientSockets[1].id,
      msgId: "testid",
      msgContent: "omggg hi!!!! :3",
      lat: user2Coords.lat,
      lon: user2Coords.lon,
      timeSent: 999999,
    };
    for (let i = 0; i < clientSockets.length; i++) {
      if (i != 1) {
        clientSockets[i].on("message", (message) => {
          console.log(`User 2 recieved message ${message}`);
          expect(message).toBe("omggg hi!!!! :3");
        });
      }
    }
    clientSockets[1].emit("message", user2Message);
    done();
    // TODO: This test case will return true, but the sent message is actually never verified.
    // The real verification of this message to lead to a pass/fail should be worked on.
  });
});
