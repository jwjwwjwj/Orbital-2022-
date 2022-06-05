import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyDW-Bk_Pg13jTMvaVij9lYtQ-5VyXRxdHY",
  authDomain: "transporfficient.firebaseapp.com",
  projectId: "transporfficient",
  storageBucket: "transporfficient.appspot.com",
  messagingSenderId: "1070082122492",
  appId: "1:1070082122492:web:575ebc2e5226c8719f2d79",
  measurementId: "G-RS80FK213M"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }
export const db = getFirestore(app);