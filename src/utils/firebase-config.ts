import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBFHUJrB4WQmgBtWnqe-xBjciZVSzBPquM',
  authDomain: 'todolist-exo.firebaseapp.com',
  projectId: 'todolist-exo',
  storageBucket: 'todolist-exo.appspot.com',
  messagingSenderId: '207224914184',
  appId: '1:207224914184:web:c896d733ab3512b1c16cbd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
