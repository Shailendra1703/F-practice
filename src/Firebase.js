import firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3QpqRO9ChQMGcKK2-X7nm0ouNr_SvCJY",
  authDomain: "contact-form-92728.firebaseapp.com",
  projectId: "contact-form-92728",
  storageBucket: "contact-form-92728.appspot.com",
  messagingSenderId: "1061592416691",
  appId: "1:1061592416691:web:6b0c7bd67d046730798bc6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// init services
const db = getFirestore();

// collection ref

const colRef = collection(db, "users");

//get data

getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);
    let user = [];

    snapshot.docs.forEach((doc) => {
      user.push({ ...doc.data(), id: doc.id });
    });
    console.log(user);
  })
  .catch((err) => {
    console.log(err.message);
  });

// export const createUserDocument = async (user) => {
//   if (!user) {
//     console.log("no user found");
//     return;
//   }

//   const { email } = user;

//   const userRef = collection(db, "users");

//   setDoc(userRef, {
//     email,
//     createdAt: new Date(),
//   })
//     .then((docRef) => {
//       console.log("Failed not suppose but yes happend");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const createUserDocument = async (user) => {
//   if (!user) return;

//   const userRef = doc(`users/${user.uid}`);

//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { email } = user;

//     try {
//       await setDoc(userRef, {
//         email: email,
//       });
//     } catch (err) {
//       console.log(err + "Hiiii");
//     }
//   }
// };

export default app;
