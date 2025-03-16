import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC1d6-VTqE3CvAkZfBgouyG-d3foDxvWiQ",
    authDomain: "react-lab-cc073.firebaseapp.com",
    projectId: "react-lab-cc073",
    storageBucket: "react-lab-cc073.appspot.com",
    messagingSenderId: "158828380879",
    appId: "1:158828380879:web:2036e61ebb615e1a28edba"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
