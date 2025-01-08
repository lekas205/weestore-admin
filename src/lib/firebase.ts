// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOXnj5WhbEXbOBfNGl7Q8K0PJZCWmuIxo",
  authDomain: "morebuy.firebaseapp.com",
  projectId: "morebuy",
  storageBucket: "morebuy.firebasestorage.app",
  messagingSenderId: "267351752624",
  appId: "1:267351752624:web:f75a2ff1d4cc6260a72075"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app, 'morebuy-app');
