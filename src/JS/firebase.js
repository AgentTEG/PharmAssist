import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC7PsuW8k7vx2Y9IpBzRG2ZK_OSVe9VcOk",
    authDomain: "fir-postman-19d34.firebaseapp.com",
    databaseURL: "https://fir-postman-19d34-default-rtdb.firebaseio.com",
    projectId: "fir-postman-19d34",
    storageBucket: "fir-postman-19d34.firebasestorage.app",
    messagingSenderId: "807089944328",
    appId: "1:807089944328:web:a41f9e0d4acda44ec45ebd",
    measurementId: "G-PC9LN0P852"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);