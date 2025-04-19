// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnnXNDipIhVRd1fcu4NACeWhI0m2c-YkI",
    authDomain: "medskills-3bfd5.firebaseapp.com",
    projectId: "medskills-3bfd5",
    storageBucket: "medskills-3bfd5.firebasestorage.app",
    messagingSenderId: "5401677338",
    appId: "1:5401677338:web:c9954e6b6e032e34bccba3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }
