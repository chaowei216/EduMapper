import { RouterProvider } from "react-router-dom";
import ToastWrapper from "./routes/ToastWrapper";
import { router } from "./routes";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPw3eSlF89CZI52g1B7UaP5f3XsOm3QbU",
  authDomain: "edummaper-94362.firebaseapp.com",
  projectId: "edummaper-94362",
  storageBucket: "edummaper-94362.appspot.com",
  messagingSenderId: "458302312934",
  appId: "1:458302312934:web:d8c9ec78e45d8abcc70627",
  measurementId: "G-YX558HBL29"
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastWrapper />
    </>
  );
}

export default App;
