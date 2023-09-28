// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3KU1wdietiTgNXXwGzyc554-ligKs9HE",
  authDomain: "coop-tabletime.firebaseapp.com",
  projectId: "coop-tabletime",
  storageBucket: "coop-tabletime.appspot.com",
  messagingSenderId: "58343609527",
  appId: "1:58343609527:web:513421f003231331852932"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Services (database, auth, etc)
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


