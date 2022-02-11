import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD2ieAU-OIFzoguCCltghE2_9qa-wxkq7s",
  authDomain: "vuex-4-fb-auth-553cb.firebaseapp.com",
  projectId: "vuex-4-fb-auth-553cb",
  storageBucket: "vuex-4-fb-auth-553cb.appspot.com",
  messagingSenderId: "33424195781",
  appId: "1:33424195781:web:83b2578f1e016c259830ac",
  measurementId: "G-QS7HC8PW0P"
};

// Init Firebase
initializeApp(firebaseConfig)

// Init Firebase auth
const auth = getAuth()

export { auth }