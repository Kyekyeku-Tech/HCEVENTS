import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import useAdmin from "./useAdmin";

/**
 * useAuth
 * Global authentication hook
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check admin role
  const { isAdmin, loading: adminLoading } = useAdmin(user);

  return {
    user,
    loading: authLoading || adminLoading,
    isAdmin,
  };
}
