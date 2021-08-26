import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDqwOMu_tw1gwwwkL20k2mUgc55rxHhQy4",
  authDomain: "url-shortener-82ad9.firebaseapp.com",
  projectId: "url-shortener-82ad9",
  storageBucket: "url-shortener-82ad9.appspot.com",
  messagingSenderId: "1023756597726",
  appId: "1:1023756597726:web:579b82bdf7a816a66c854f",
  measurementId: "G-CWEXP57JZ0"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
