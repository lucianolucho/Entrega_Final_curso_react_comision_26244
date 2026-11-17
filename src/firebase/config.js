

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt0dY_Dn01_J7D9nOec_Dzez9NuCVVMDw",
  authDomain: "proyecto-react-26.firebaseapp.com",
  projectId: "proyecto-react-26",
  storageBucket: "proyecto-react-26.firebasestorage.app",
  messagingSenderId: "611361832359",
  appId: "1:611361832359:web:fdc476919c481dfa00ca82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

 export default db;  