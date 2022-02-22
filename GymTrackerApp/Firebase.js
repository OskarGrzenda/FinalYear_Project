// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcaqHn-u0IDZGW_eByQtQ-pLO6m_t6k94",
  authDomain: "gymtrackerfirebase.firebaseapp.com",
  projectId: "gymtrackerfirebase",
  storageBucket: "gymtrackerfirebase.appspot.com",
  messagingSenderId: "664691680450",
  appId: "1:664691680450:web:54b56229866eb8710bc75b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
