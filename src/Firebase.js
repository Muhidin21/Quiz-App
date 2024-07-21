// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLDeVk6qq-2LOVU1hFzcQX1zQshoQHI1o",
  authDomain: "somali-history-quiz.firebaseapp.com",
  projectId: "somali-history-quiz",
  storageBucket: "somali-history-quiz.appspot.com",
  messagingSenderId: "950886786715",
  appId: "1:950886786715:web:5c88899c3c5a60740ac83e",
  measurementId: "G-QXW6VG11FY"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };