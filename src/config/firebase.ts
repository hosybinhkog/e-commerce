import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmFEUZY5U18doFqTvsRlQyO0-czLnS08s",
  authDomain: "ecommerce-doanchuyennganh.firebaseapp.com",
  projectId: "ecommerce-doanchuyennganh",
  storageBucket: "ecommerce-doanchuyennganh.appspot.com",
  messagingSenderId: "181481884565",
  appId: "1:181481884565:web:0ae3c827e50dc75a66049c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
