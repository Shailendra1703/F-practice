import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const db = getFirestore();

// collection ref

const colRef = collection(db, "users");

//get data
export default async function createUserCollection(user) {
  const data = {
    name: user.displayName,
    email: user.email,
    phone: "",
  };

  const res = await db.collection("users").doc(user.uid).set(data);

  console.log(res);
}

// db.collection("users").doc(user.uid).set({
//   name: user.displayName,
//   email: user.email,
// });
// export default createUserCollection;
