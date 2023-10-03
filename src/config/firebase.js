import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDCTJUsYuJozO0QZnqvCEGh0dNnbX1AX8M",
  authDomain: "stream-list-d9c07.firebaseapp.com",
  projectId: "stream-list-d9c07",
  storageBucket: "stream-list-d9c07.appspot.com",
  messagingSenderId: "45095951163",
  appId: "1:45095951163:web:99eb950cbd28a0c3aa351e",
  measurementId: "G-TBE6HK3TF8"
};

const app = initializeApp(firebaseConfig);

export const auth= getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        
    })
    .catch((error) => {
        console.error(error);
    });

export const googleProvider= new GoogleAuthProvider();
export const db = getFirestore(app);
