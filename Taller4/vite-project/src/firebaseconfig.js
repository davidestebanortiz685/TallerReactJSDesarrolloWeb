// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyHZzTy9Zbk3505xqabseCG-HXY2G0zWA",
  authDomain: "taller4-3be8b.firebaseapp.com",
  projectId: "taller4-3be8b",
  storageBucket: "taller4-3be8b.firebasestorage.app",
  messagingSenderId: "1046628934762",
  appId: "1:1046628934762:web:4542d4a46f727f60865613",
  measurementId: "G-5J2Y1YWCD7"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);
export const auth = getAuth(appFirebase);

