import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({
    portfolio: 0,
    services: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const [portfolioSnap, servicesSnap, bookingsSnap] = await Promise.all([
          getDocs(collection(db, "portfolio")),
          getDocs(collection(db, "services")),
          getDocs(collection(db, "bookings")),
        ]);

        if (!isMounted) return;

        setStats({
          portfolio: portfolioSnap.size,
          services: servicesSnap.size,
          bookings: bookingsSnap.size,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
        if (isMounted) {
          setError("Unable to load dashboard data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  /* LOADING STATE */
  if (loading) {
    return (
      <p
        className="text-xs uppercase tracking-widest opacity-60"
        role="status"
        aria-live="polite"
      >
        Loading dashboard…
      </p>
    );
  }

  /* ERROR STATE */
  if (error) {
    return (
      <p
        className="text-xs uppercase tracking-widest text-red-700"
        role="alert"
      >
        {error}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="font-serif text-[28px] mb-12">
        Welcome back
      </h1>

      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        aria-label="Admin statistics"
      >
        <StatCard label="Portfolio Items" value={stats.portfolio} />
        <StatCard label="Services" value={stats.services} />
        <StatCard label="Appointments" value={stats.bookings} />
      </section>
    </motion.div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="border border-black/10 px-8 py-10">
      <p className="text-xs uppercase tracking-widest opacity-60 mb-6">
        {label}
      </p>
      <p
        className="font-serif text-[42px]"
        aria-label={`${label}: ${value}`}
      >
        {value}
      </p>
    </div>
  );
}
