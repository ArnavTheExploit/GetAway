// src/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9d120IHf0eawnFfHkO1FKZUF2v6Ylg0c",
  authDomain: "getaway-717f8.firebaseapp.com",
  projectId: "getaway-717f8",
  storageBucket: "getaway-717f8.firebasestorage.app",
  messagingSenderId: "782163230745",
  appId: "1:782163230745:web:007431a04a0f27c198ea88",
  measurementId: "G-7492X8WEK0"
};

// ✅ Only initialize Firebase once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Handle initializeAuth safely (only once)
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // If already initialized, just get it
  auth = getAuth(app);
}

// ✅ Firestore
const db = getFirestore(app);

export { app, auth, db };
