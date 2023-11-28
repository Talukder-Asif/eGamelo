/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  // Create Account with Email and Password
  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const login = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log Out
  const logOut = () => {
    setloading(true);
    return signOut(auth);
  };

  // Manage account with google
  const googleSignup = () => {
    setloading(true);
    return signInWithPopup(auth, provider);
  };

  // Update account
  const update = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Set user Data
  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      setloading(false);
      if (User) {
        setUser(User);
      }
    });
  }, []);

  const userInfo = {
    user,
    createUser,
    loading,
    logOut,
    login,
    googleSignup,
    update,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
