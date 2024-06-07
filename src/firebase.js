// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // ecrire Votre Configuration de votre projet
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const database = getDatabase(app);

//export { database };
export const db = getFirestore(app)