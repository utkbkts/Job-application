import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "netflix-939a2.firebaseapp.com",
  projectId: "netflix-939a2",
  storageBucket: "netflix-939a2.appspot.com",
  messagingSenderId: "152132991487",
  appId: "1:152132991487:web:90e4cea08f4c17bc19cfca",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
