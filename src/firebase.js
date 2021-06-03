import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAT2X8cEC5qlHD9n_gtsYj2qgMOHoErREE",
    authDomain: "vuenote-1ef43.firebaseapp.com",
    projectId: "vuenote-1ef43",
    storageBucket: "vuenote-1ef43.appspot.com",
    messagingSenderId: "608724586318",
    appId: "1:608724586318:web:e7635d1eeaaf5f5b18d81f"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
