// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-fyh4DWb0UsT1eM5bdI70XGIttaNl-oQ",
  authDomain: "chuka-62524.firebaseapp.com",
  projectId: "chuka-62524",
  storageBucket: "chuka-62524.appspot.com",
  messagingSenderId: "768193909013",
  appId: "1:768193909013:web:4c19d1f1ed7aabad0e191c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);
