import React, { useContext, useEffect, useState } from "react";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login now performs registration
  async function login(email, password, passwordConfirm) {
    if (password !== passwordConfirm) {
      return Promise.reject(new Error("Passwords don't match"));
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user info to Firestore (DO NOT store password)
      const data = {
        email: user.email,
        position: "student",
        uid: user.uid,
        // password:user.password
      };

      await setDoc(doc(db, "users", user.uid), data);
      console.log("User added to Firestore");
    } catch (error) {
      console.error(
        "Error during login (registration):",
        error.code,
        error.message
      );
      throw error;
    }
  }

  async function addtocart(email, size, qty, total, name) {
    try {
      const data = {
        email: email,
        name: name,
        qty: qty,
        size: size,
        total: total,
      };
      await addDoc(doc(db,"cart"),data);
    } catch (error) {
      console.error(
        "Error during login (registration):",
        error.code,
        error.message
      );
      throw error;
    }
  }
  // signup now performs actual login
  async function signup(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error during signup (login):", error.code, error.message);
      throw error;
    }
  }


  function logout() {
    alert("Logging out")
    return signOut(auth);
  }

  function resetpassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetpassword,
    addtocart
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
