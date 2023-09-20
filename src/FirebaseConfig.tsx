// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCa7c6pqejl4izogUcOM42NjhwjWsVrt1Y",
  authDomain: "shopping-list-de.firebaseapp.com",
  projectId: "shopping-list-de",
  storageBucket: "shopping-list-de.appspot.com",
  messagingSenderId: "675701152858",
  appId: "1:675701152858:web:33865c6c2312a0fac2cc63",
  measurementId: "G-V1J04HHCZ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
