import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (loading) {
    return (
      <p className="text-xs uppercase tracking-widest opacity-60">
        Loading bookings…
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-serif mb-10">
        Appointments
      </h1>

      {bookings.length === 0 ? (
        <p className="text-sm opacity-60">
          No appointments yet.
        </p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border border-black/10 p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-6">
                <div>
                  <p className="font-serif text-lg mb-2">
                    {b.name}
                  </p>
                  <p className="text-sm opacity-70">
                    {b.email}
                  </p>
                  <p className="text-sm mt-2">
                    {b.service}
                  </p>
                </div>

                <div className="text-sm">
                  <p>
                    <span className="opacity-60">Date:</span>{" "}
                    {b.date}
                  </p>
                  <p>
                    <span className="opacity-60">Time:</span>{" "}
                    {b.time}
                  </p>
                  <p className="mt-2">
                    <span className="opacity-60">Status:</span>{" "}
                    <strong>{b.status}</strong>
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  {b.status !== "approved" && (
                    <ActionButton
                      label="Approve"
                      onClick={() => updateStatus(b.id, "approved")}
                    />
                  )}
                  {b.status !== "completed" && (
                    <ActionButton
                      label="Complete"
                      onClick={() => updateStatus(b.id, "completed")}
                    />
                  )}
                  {b.status !== "cancelled" && (
                    <ActionButton
                      label="Cancel"
                      onClick={() => updateStatus(b.id, "cancelled")}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-black px-4 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
    >
      {label}
    </button>
  );
}
