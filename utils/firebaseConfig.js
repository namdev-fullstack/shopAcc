// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa1AgIOHfODTFiRztMSR77GDVdu3Y7IIE",
  authDomain: "topfood-4f299.firebaseapp.com",
  projectId: "topfood-4f299",
  storageBucket: "topfood-4f299.firebasestorage.app",
  messagingSenderId: "227579592240",
  appId: "1:227579592240:web:c8ecacf6c2e28db7d377f5",
  measurementId: "G-9C10VY3VGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

