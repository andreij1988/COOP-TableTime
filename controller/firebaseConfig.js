import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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

const db = getFirestore(app);

const auth = getAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };