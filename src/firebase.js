// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm5XMrDlee_GYR2f66rYwLC-YvazV1Xtk",
  authDomain: "slack-clone-51ace.firebaseapp.com",
  projectId: "slack-clone-51ace",
  storageBucket: "slack-clone-51ace.appspot.com",
  messagingSenderId: "285717460499",
  appId: "1:285717460499:web:2895985b89f645ccdc31e6",
  measurementId: "G-WTX4QPPJB7",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
