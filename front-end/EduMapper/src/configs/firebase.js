import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPw3eSlF89CZI52g1B7UaP5f3XsOm3QbU",
  authDomain: "edummaper-94362.firebaseapp.com",
  projectId: "edummaper-94362",
  storageBucket: "edummaper-94362.appspot.com",
  messagingSenderId: "458302312934",
  appId: "1:458302312934:web:d8c9ec78e45d8abcc70627",
  measurementId: "G-YX558HBL29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
var provider = new GoogleAuthProvider();

export { auth, provider };
