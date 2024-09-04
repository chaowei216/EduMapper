import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhhTR1lBloFUzoZ-e4Vrpc4XjZjT5KpxM",
  authDomain: "edumapper-30f47.firebaseapp.com",
  projectId: "edumapper-30f47",
  storageBucket: "edumapper-30f47.appspot.com",
  messagingSenderId: "382015922500",
  appId: "1:382015922500:web:c8b0a4b098b53460f4f711",
  measurementId: "G-EWQZF377W2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
var provider = new GoogleAuthProvider();

export { auth, provider };
