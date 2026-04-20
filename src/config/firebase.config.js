// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCIgcQ1ASm-VsAg-YozUgpQrjYLy4U7CI8",
  authDomain: "saas-pms-dashboard-sc.firebaseapp.com",
  projectId: "saas-pms-dashboard-sc",
  storageBucket: "saas-pms-dashboard-sc.firebasestorage.app",
  messagingSenderId: "833943063498",
  appId: "1:833943063498:web:3b2f18a04c9757abef1d33",
  measurementId: "G-9R93V0M9V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}