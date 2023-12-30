import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  
  import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged,signOut,sendEmailVerification,
     signInWithPopup, GoogleAuthProvider
   } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore,setDoc ,doc,addDoc,getDoc,getDocs,collection, query,where, updateDoc ,deleteDoc ,deleteField ,onSnapshot} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLcTooIOuWhV3zVoicJlm82bX711BmqE8",
  authDomain: "new-login-project-b5de9.firebaseapp.com",
  projectId: "new-login-project-b5de9",
  storageBucket: "new-login-project-b5de9.appspot.com",
  messagingSenderId: "440992145032",
  appId: "1:440992145032:web:e49b4812c8996e994b493d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
// const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  getFirestore,
  setDoc,
  doc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification ,
  signInWithPopup, 
  // provider,
  GoogleAuthProvider,
  addDoc,
  getDoc,
  collection,
   updateDoc ,deleteDoc ,deleteField ,
   onSnapshot,
   getDocs,
   query,
   where,
}
