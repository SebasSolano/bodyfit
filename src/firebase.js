// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAJk1Jz4G4E9aFVDMyVyNU-4Aupwx-t8Ug",
  authDomain: "gym-app-f7fa2.firebaseapp.com",
  projectId: "gym-app-f7fa2",
  storageBucket: "gym-app-f7fa2.appspot.com",
  messagingSenderId: "36618322621",
  appId: "1:36618322621:web:fb46688b0534ba2964add4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
