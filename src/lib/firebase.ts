
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  "projectId": "petalcart",
  "appId": "1:1045812420155:web:ab9e7c11f10c985f10061e",
  "storageBucket": "petalcart.appspot.com",
  "apiKey": "AIzaSyAE9mxC5jhGPKDhYB0fQn94EdGuaL-lJgg",
  "authDomain": "petalcart.firebaseapp.com",
  "messagingSenderId": "1045812420155"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
