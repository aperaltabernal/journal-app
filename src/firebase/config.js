// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaCgk_Dh_aNl03IKiw3RP8w3qA7Yu3cvg",
  authDomain: "react-1-4a83d.firebaseapp.com",
  projectId: "react-1-4a83d",
  storageBucket: "react-1-4a83d.appspot.com",
  messagingSenderId: "823090819808",
  appId: "1:823090819808:web:f671a830dad38ae14bd685"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Funcionalidades para autenticación
export const FirebaseAuth = getAuth(FirebaseApp);

//Base de datos
export const FiresbaseDB = getFirestore(FirebaseApp);