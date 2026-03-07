import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// حطي هنا البيانات اللي نسختيها من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMAWRDrKB6mAs39dTSR7mj6ofarGpPtTs",
  authDomain: "moodmate-d5fcf.firebaseapp.com",
  projectId: "moodmate-d5fcf",
  storageBucket: "moodmate-d5fcf.firebasestorage.app",
  messagingSenderId: "402891012606",
  appId: "1:402891012606:web:83280f161c7579a2be68af"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;