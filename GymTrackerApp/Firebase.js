import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { useState, useEffect } from "react";

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

export const db = getFirestore(app);

export const authentication = getAuth(app);

//Hook
export function useAuth()
{
  const[ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(authentication, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}


