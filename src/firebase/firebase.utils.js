import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxs_xqfciAtoZWUy23fZrX3TSQE7e9qVE",
    authDomain: "fashionet-b17ce.firebaseapp.com",
    databaseURL: "https://fashionet-b17ce.firebaseio.com",
    projectId: "fashionet-b17ce",
    storageBucket: "fashionet-b17ce.appspot.com",
    messagingSenderId: "438989095151",
    appId: "1:438989095151:web:508b61603615eed7f15b1a",
    measurementId: "G-LSWG34CJ6E"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;