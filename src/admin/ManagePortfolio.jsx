import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ManagePortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const q = query(
          collection(db, "portfolio"),
          orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(data);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this portfolio item?")) return;

    try {
      await deleteDoc(doc(db, "portfolio", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete item.");
    }
  };

  if (loading) {
    return (
      <p className="text-xs uppercase tracking-widest opacity-60">
        Loading portfolio…
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
          Portfolio
        </h1>

        <Link
          to="/admin/portfolio/upload"
          className="border border-black px-6 py-2 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
        >
          Upload New
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm opacity-60">
          No portfolio items yet.
        </p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-black/10 p-6 flex flex-col md:flex-row md:justify-between gap-6"
            >
              <div>
                <p className="font-serif text-lg">
                  {item.title}
                </p>
                <p className="text-xs uppercase tracking-widest opacity-60 mt-1">
                  {item.category}
                </p>
                <p className="text-sm opacity-70 mt-2">
                  {item.images?.length || 0} images
                </p>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs uppercase tracking-widest text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
