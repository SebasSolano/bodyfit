import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJk1Jz4G4E9aFVDMyVyNU-4Aupwx-t8Ug",
  authDomain: "gym-app-f7fa2.firebaseapp.com",
  projectId: "gym-app-f7fa2",
  storageBucket: "gym-app-f7fa2.appspot.com",
  messagingSenderId: "36618322621",
  appId: "1:36618322621:web:fb46688b0534ba2964add4"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
