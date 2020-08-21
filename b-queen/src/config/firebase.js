import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyClPdjmQOQDgV7wGf4jhYEKgQbgYthpK6c",
  authDomain: "burgerqueen-lab004.firebaseapp.com",
  databaseURL: "https://burgerqueen-lab004.firebaseio.com",
  projectId: "burgerqueen-lab004",
  storageBucket: "burgerqueen-lab004.appspot.com",
  messagingSenderId: "581646562368",
  appId: "1:581646562368:web:a77cb3694773de54d09ba5",
  measurementId: "G-RCGWE5C11B"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);