import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      /* SIGN IN */
      const res = await signInWithEmailAndPassword(auth, email, password);

      /* CHECK ADMIN PERMISSION */
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await signOut(auth);
        throw new Error("User profile not found");
      }

      const userData = userSnap.data();

      // Check if user is approved
      if (!userData.approved || userData.role === "pending") {
        await signOut(auth);
        throw new Error("Your registration is pending approval from an administrator");
      }

      // Check if user has admin role
      if (userData.role !== "admin") {
        await signOut(auth);
        throw new Error("Access denied");
      }

      /* ACCESS GRANTED */
      // Small delay to ensure auth state propagates
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 100);
    } catch (err) {
      setError(err.message || "Invalid credentials or access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/e7/f0/c6/e7f0c64ed3866441904959b0477d4d2c.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/30 pointer-events-none" aria-hidden="true" />
      <motion.div
        className="relative z-10 max-w-sm w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-center font-serif text-[22px] tracking-wide mb-10">
          Admin Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          noValidate
        >
          {/* EMAIL */}
          <div>
            <label
              htmlFor="admin-email"
              className="block text-xs uppercase tracking-widest mb-2"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-black/30 py-2 focus:outline-none focus:border-black"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs uppercase tracking-widest mb-2"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-black/30 py-2 focus:outline-none focus:border-black"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p
              className="text-xs text-red-700 text-center"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full border border-black py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-center text-xs mt-8 text-black/60">
          New admin?{" "}
          <Link to="/admin/signup" className="underline hover:opacity-70">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
