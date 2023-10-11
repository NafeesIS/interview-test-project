// Import the necessary functions and modules from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the auth function

// Firebase configuration using environmental variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// Get the auth module
export const auth = getAuth(app);
