import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import createUserCollection from "../database";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { getDownloadURL, getStorage, uploadBytes, ref } from "firebase/storage";

const db = getFirestore();
const storage = getStorage();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();

  const signup = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      // await createUserDocument(user);
      const ref = doc(db, "users", result.user.uid);
      const docref = await setDoc(ref, {
        email: result.user.email,
        uid: result.user.uid,
      })
        .then((re) => {
          alert("Data entered");
          navigate("/profile");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const signIn = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("user Logges out");
    } catch (error) {
      console.log(error.message);
    }
    navigate("/login");
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const upload = async (file, currentUser, setLoading) => {
    const fileRef = ref(storage, `profile_pictures/${currentUser.uid}.png`);

    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });
    setLoading(false);

    alert("Huraa uploaded successfully");
  };

  const getCurrentUserData = async (id, setProfileData) => {
    const docref = doc(db, "users", id);
    // const docSnap = await getDoc(docref);

    // if (docSnap.exists()) {
    //   console.log(docSnap.data());
    //   setProfileData(docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }

    const unsub = onSnapshot(docref, (value) => {
      if (value.exists()) {
        console.log("Current Data : ", value.data());
        setProfileData(value.data());
      } else {
        console.log("No such document!");
      }
    });
  };

  const uploadDocument = async (file, docname, currentUser) => {
    const fileRef = ref(storage, `documents/${currentUser.uid}_${docname}`);

    const snapshot = await uploadBytes(fileRef, file);
    const keyName = await getDownloadURL(fileRef);
    console.log(keyName);

    const ref_doc = doc(db, "users", currentUser.uid);
    const date = new Date();
    const day = date.toLocaleString("en-us", { weekday: "long" });

    const newData = {
      documents: arrayUnion({
        title: docname,
        url: keyName,
        date: date.getDate() + " " + day + " " + date.getFullYear(),
      }),
    };
    // lastUpdateda: date,
    const docref = await updateDoc(ref_doc, newData, { merge: true });
    alert("Updated Profile");
    updateProfile(currentUser, { keyName });
    alert(`added ${docname}}`);
  };

  const value = {
    currentUser,
    signup,
    signIn,
    logout,
    resetPassword,
    upload,
    uploadDocument,
    getCurrentUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
