import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyBaqT3RnjJ2St3T0KRENZOy6_OeyWdd4cQ",
  authDomain: "peeppips-web.firebaseapp.com",
  projectId: "peeppips-web",
  storageBucket: "peeppips-web.appspot.com",
  messagingSenderId: "682271042427",
  appId: "1:682271042427:web:4ea6c0c829c2f283146bde",
  measurementId: "G-SMF7WDGRJL"
});
  
const storage = getStorage(app);
export default storage;