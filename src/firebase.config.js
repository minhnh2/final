import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLaKP0_jRpLXbm6C-EL3aq-VlZ8qoHswk",
  authDomain: "foodie-app-7f973.firebaseapp.com",
  databaseURL: "https://foodie-app-7f973-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "foodie-app-7f973",
  storageBucket: "foodie-app-7f973.appspot.com",
  messagingSenderId: "1082465525319",
  appId: "1:1082465525319:web:f01dddaeaea8c31eaddb62",
  measurementId: "G-1F2J9K8NQH"
};

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage }

  // getapp : 