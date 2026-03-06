import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6TJLvN8AKSAWKGPZJr8MSsJD5GdP62gA",
  authDomain: "hcevent-713d6.firebaseapp.com",
  projectId: "hcevent-713d6",
  storageBucket: "hcevent-713d6.firebasestorage.app",
  messagingSenderId: "366369208649",
  appId: "1:366369208649:web:e60c3b7935f91bc644c298",
  measurementId: "G-4C76C0VMT2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

export default app;
