import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtuHaXz2IZACs5H1qhg6z7wkBsmHmtz9E",
  authDomain: "signal-clone-ecf94.firebaseapp.com",
  projectId: "signal-clone-ecf94",
  storageBucket: "signal-clone-ecf94.appspot.com",
  messagingSenderId: "372790264380",
  appId: "1:372790264380:web:391adf11e60d8a8e80b939",
};

//optimization for init
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase
const db = getFirestore();
const auth = getAuth();

export { auth, db };
