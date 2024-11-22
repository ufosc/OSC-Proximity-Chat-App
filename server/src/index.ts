import { initFirebase } from "./firebase_methods";
import { startSocketServer } from "./socket_server/socket_server"

initFirebase();
startSocketServer();
