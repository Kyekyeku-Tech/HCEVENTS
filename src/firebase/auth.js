import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

/**
 * Sign in admin with email & password
 */
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign out current user
 */
export const logout = () => {
  return signOut(auth);
};

/**
 * Listen to auth state changes
 * @param {function} callback
 */
export const listenToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};
