import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import createUserCollection from "../database";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore();

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
        phoneNumber: result.user.phoneNumber,
      })
        .then((re) => {
          alert("Data entered");
        })
        .catch((e) => {
          console.log(e.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    navigate("/about");
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

  const value = {
    currentUser,
    signup,
    signIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
