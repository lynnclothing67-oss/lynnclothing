
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "petalcart",
  "appId": "1:1045812420155:web:ab9e7c11f10c985f10061e",
  "storageBucket": "petalcart.firebasestorage.app",
  "apiKey": "AIzaSyAE9mxC5jhGPKDhYB0fQn94EdGuaL-lJgg",
  "authDomain": "petalcart.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1045812420155"
};


// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
