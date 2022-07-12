import { getAuth } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkDqJD5oK5B5ajrgUpDZPy6mAnlKcZHmg",
  authDomain: "talktorque-4d234.firebaseapp.com",
  projectId: "talktorque-4d234",
  storageBucket: "talktorque-4d234.appspot.com",
  messagingSenderId: "562110916039",
  appId: "1:562110916039:web:29698bb940e1ed826d65e2",
  measurementId: "G-ZSXLTQW2SC",
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
