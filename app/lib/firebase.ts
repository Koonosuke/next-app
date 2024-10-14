// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf1C9Gqb8ROW92Wtc8Gd8ZiwTW_Ijoz7E",
  authDomain: "portnextjs-19e37.firebaseapp.com",
  projectId: "portnextjs-19e37",
  storageBucket: "portnextjs-19e37.appspot.com",
  messagingSenderId: "1058573600437",
  appId: "1:1058573600437:web:307a45abbcc9a61cb3e0fc",
  measurementId: "G-EPDFN465MD",
};
// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// FirestoreとAuthenticationインスタンスの作成
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
