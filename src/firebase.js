import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAC73ppS0g1u-sWg8nBx-WEtwMXZCv67sc",
  authDomain: "clone-f3e0d.firebaseapp.com",
  projectId: "clone-f3e0d",
  storageBucket: "clone-f3e0d.appspot.com",
  messagingSenderId: "781752256995",
  appId: "1:781752256995:web:d0ca4e3c17800606afb8d6",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
