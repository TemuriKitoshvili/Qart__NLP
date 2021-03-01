import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCazWx-LG-roilYpoV--1mGgPaxzJ1rKAo',
  authDomain: 'georgiannlp.firebaseapp.com',
  projectId: 'georgiannlp',
  storageBucket: 'georgiannlp.appspot.com',
  messagingSenderId: '815598216064',
  appId: '1:815598216064:web:2b8fd1c38ced7e11ba9765',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storageRef = firebase.storage();

export { auth, provider, storageRef, firebaseApp };
