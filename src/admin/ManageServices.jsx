import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, "services"),
          orderBy("title", "asc")
        );
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <p className="text-xs uppercase tracking-widest opacity-60">
        Loading services…
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-serif">
          Services
        </h1>

        {/* Optional future feature */}
        <button
          disabled
          className="border border-black/30 px-6 py-2 text-xs uppercase tracking-widest opacity-40 cursor-not-allowed"
        >
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <p className="text-sm opacity-60">
          No services created yet.
        </p>
      ) : (
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-black/10 p-6 flex flex-col md:flex-row md:justify-between gap-6"
            >
              <div>
                <p className="font-serif text-lg">
                  {service.title}
                </p>
                <p className="text-sm opacity-60 mt-1">
                  {service.subtitle}
                </p>
              </div>

              <Link
                to={`/admin/services/${service.id}`}
                className="border border-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
