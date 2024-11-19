import { initializeApp } from "firebase-admin/app";
import { startSocketServer } from "./socket_server/socket_server"

// Must be called from google environment (Cloud Run, App Engine, and Cloud Functions)
initializeApp();

startSocketServer();
