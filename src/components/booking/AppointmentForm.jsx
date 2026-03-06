import React from "react";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { motion } from "framer-motion";

const SERVICES = [
  "Wedding Design",
  "Fashion Styling & Creative Direction",
  "Product Design",
  "Creative Direction",
];

export default function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICES[0],
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        service: SERVICES[0],
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-black/20 p-10 text-center"
      >
        <p className="font-serif text-xl mb-4">
          Thank you
        </p>
        <p className="text-sm opacity-70">
          Your consultation request has been received.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-xl space-y-8"
    >
      {/* NAME */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Name
        </label>
        <input
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
        />
      </div>

      {/* SERVICE */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Service
        </label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
        >
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* DATE */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Preferred Date
        </label>
        <input
          type="date"
          name="date"
          required
          value={form.date}
          onChange={handleChange}
          className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
        />
      </div>

      {/* TIME */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Preferred Time
        </label>
        <input
          type="time"
          name="time"
          required
          value={form.time}
          onChange={handleChange}
          className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
        />
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Message (Optional)
        </label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-black/20 bg-transparent p-4 focus:outline-none"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="border border-black px-10 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
      >
        {loading ? "Submitting…" : "Book Consultation"}
      </button>
    </motion.form>
  );
}
