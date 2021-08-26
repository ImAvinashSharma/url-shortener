import firebase from "firebase";

const firebaseConfig = {
  apiKey: "x",
  authDomain: "x",
  projectId: "x",
  storageBucket: "x",
  messagingSenderId: "x",
  appId: "x",
  measurementId: "x"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
