import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCJr-zYsozbLpqy7hkIRuUJrTEpMlRLlpo",
  authDomain: "sku-markets-25714.firebaseapp.com",
  projectId: "sku-markets-25714",
  storageBucket: "sku-markets-25714.appspot.com",
  messagingSenderId: "768825426266",
  appId: "1:768825426266:web:e2709461fb2fc885a83363",
  measurementId: "G-4WGZBL015B"
});
  
const storage = getStorage(app);
export default storage;