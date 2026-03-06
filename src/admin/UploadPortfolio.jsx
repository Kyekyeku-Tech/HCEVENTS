import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { motion } from "framer-motion";

const CATEGORIES = [
  "wedding-design",
  "fashion-styling-creative-direction",
  "product-design",
  "creative-direction",
];

export default function UploadPortfolio() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || files.length === 0) {
      alert("Title and images are required.");
      return;
    }

    setLoading(true);

    try {
      const urls = [];

      for (const file of files) {
        const storageRef = ref(
          storage,
          `portfolio/${Date.now()}-${file.name}`
        );
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        urls.push(url);
      }

      await addDoc(collection(db, "portfolio"), {
        title,
        category,
        images: urls,
        createdAt: serverTimestamp(),
      });

      navigate("/admin/portfolio");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-xl"
    >
      <h1 className="text-2xl font-serif mb-10">
        Upload Portfolio
      </h1>

      <form onSubmit={handleUpload} className="space-y-8">
        {/* TITLE */}
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* FILES */}
        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">
            Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="w-full"
          />
          <p className="text-xs opacity-60 mt-2">
            You can upload multiple images.
          </p>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="border border-black px-10 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
        >
          {loading ? "Uploading…" : "Publish"}
        </button>
      </form>
    </motion.div>
  );
}
