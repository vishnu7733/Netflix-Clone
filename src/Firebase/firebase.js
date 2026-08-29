// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZdktoGNUFvEIsp7SPpDxoQfXw7RIM3F8",
  authDomain: "netflix-clone-164e8.firebaseapp.com",
  projectId: "netflix-clone-164e8",
  storageBucket: "netflix-clone-164e8.firebasestorage.app",
  messagingSenderId: "301374408159",
  appId: "1:301374408159:web:4e9dc708176a237e99f06a",
  measurementId: "G-2XSFYC59M1"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app;
 export const auth=getAuth();
 export const db=getFirestore(app);