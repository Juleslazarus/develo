import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'; 
import { getAuth } from 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyCKKkM2Fpzz6VedYU3l7jQ7ZEnWyqoRshI",
  authDomain: "develo-planner.firebaseapp.com",
  projectId: "develo-planner",
  storageBucket: "develo-planner.appspot.com",
  messagingSenderId: "21732986295",
  appId: "1:21732986295:web:9f17b3215e4425d0cc2c32"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app); 
export const auth = getAuth(app); 