// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByzy-L4wKf1YnOGJpoNnlxkzhw7BLmIyo",
  authDomain: "subscription-box-auth-react.firebaseapp.com",
  projectId: "subscription-box-auth-react",
  storageBucket: "subscription-box-auth-react.firebasestorage.app",
  messagingSenderId: "27556216027",
  appId: "1:27556216027:web:ac26b13042a305b0b560fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);