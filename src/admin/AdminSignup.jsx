import { useState } from "react";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Check if email already exists in Firebase Auth
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        throw new Error("Email already registered");
      }

      // Create Firebase user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create user document with pending approval
      await setDoc(doc(db, "users", res.user.uid), {
        email,
        name,
        role: "pending",
        approved: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setSuccess("Registration successful! Please wait for admin approval before logging in.");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 3000);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          Admin Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          noValidate
        >
          {/* NAME */}
          <div>
            <label
              htmlFor="admin-name"
              className="block text-xs uppercase tracking-widest mb-2"
            >
              Full Name
            </label>
            <input
              id="admin-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-black/30 py-2 focus:outline-none focus:border-black"
            />
          </div>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-black/30 py-2 focus:outline-none focus:border-black"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-xs text-red-700 text-center" role="alert">
              {error}
            </p>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <p className="text-xs text-green-700 text-center" role="status">
              {success}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full border border-black py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {loading ? "Registering…" : "Register"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-xs mt-8 text-black/60">
          Already registered?{" "}
          <Link to="/admin/login" className="underline hover:opacity-70">
            Sign in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
