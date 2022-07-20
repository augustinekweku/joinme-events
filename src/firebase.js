import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCj6_KyNvx8XSHSwbHDjacGl2Tm6pGpHVs",
    authDomain: "kamens-events.firebaseapp.com",
    projectId: "kamens-events",
    storageBucket: "kamens-events.appspot.com",
    messagingSenderId: "664592201677",
    appId: "1:664592201677:web:85e239378379058153f684",
    measurementId: "G-6WKD4QBYX5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
