import { startRESTServer } from "./rest_server/rest_server"
import { startSocketServer } from "./socket_server/socket_server"

// Unsure if REST server is even necessary for MVP; auth, managing database can be done on client with https://rnfirebase.io/
//startRESTServer();
startSocketServer();
