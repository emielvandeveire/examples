import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBSckPGbF_8rC4R0Ka94q8m4_TTSd6IIKM",
  authDomain: "xamples-5d4a6.firebaseapp.com",
  projectId: "xamples-5d4a6",
  storageBucket: "xamples-5d4a6.appspot.com",
  messagingSenderId: "267934754523",
  appId: "1:267934754523:web:d77a98e5c7c009f6258efe",
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }

