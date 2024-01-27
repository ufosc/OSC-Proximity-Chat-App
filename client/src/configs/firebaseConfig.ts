import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth, Auth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from "@env"; // Don't worry about this env error!



const firebaseConfig = {
  apiKey: "AIzaSyCTpiaslzR6h75b7r262KW97g9Nho1bsUE",
  authDomain: "proxchat-ad12c.firebaseapp.com",
  projectId: "proxchat-ad12c",
  storageBucket: "proxchat-ad12c.appspot.com",
  messagingSenderId: "399108933140",
  appId: "1:399108933140:web:222da991755cb159700901",
  measurementId: "G-LVYZJKW1CR"
};


let app;
let auth: Auth;


// Checks if auth and app have already been initilized as Firebase will throw an error if we try to initialize twice!
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth();
}

export { app, auth };