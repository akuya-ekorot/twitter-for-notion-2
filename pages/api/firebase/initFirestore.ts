import { initializeApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB5U4u7KXAOwKwucaHIL2TfZzFGgfmQTM",
  authDomain: "twitter-for-notion.firebaseapp.com",
  projectId: "twitter-for-notion",
  storageBucket: "twitter-for-notion.appspot.com",
  messagingSenderId: "531724490820",
  appId: "1:531724490820:web:c96b272ee29b3677e38411",
  measurementId: "G-CQ4W5NM8QE",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
