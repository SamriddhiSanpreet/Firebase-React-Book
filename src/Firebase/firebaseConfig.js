
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,signOut } from "firebase/auth";  // Import Firebase Auth
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDOWGzgyeBbFV0hSc2HDTQGklfzctt4sxU",
    authDomain: "library-management-syste-5b08f.firebaseapp.com",
    projectId: "library-management-syste-5b08f",
    storageBucket: "library-management-syste-5b08f.firebasestorage.app",
    messagingSenderId: "903603019591",
    appId: "1:903603019591:web:a6652a21b6a711ed9b3662",
    measurementId: "G-8E12R8DE1X"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Auth
const analytics = getAnalytics(app);

export { db, auth, analytics };

