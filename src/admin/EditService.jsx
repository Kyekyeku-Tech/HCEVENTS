import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { motion } from "framer-motion";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [sublinks, setSublinks] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const ref = doc(db, "services", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          navigate("/admin/services");
          return;
        }

        const data = snap.data();
        setTitle(data.title || "");
        setSubtitle(data.subtitle || "");
        setContent(data.content || "");
        setSublinks(data.sublinks || []);
      } catch (err) {
        console.error("Failed to load service:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, navigate]);

  const handleSubLinkChange = (index, field, value) => {
    const updated = [...sublinks];
    updated[index][field] = value;
    setSublinks(updated);
  };

  const addSubLink = () => {
    setSublinks([...sublinks, { title: "", content: "" }]);
  };

  const removeSubLink = (index) => {
    setSublinks(sublinks.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "services", id), {
        title,
        subtitle,
        content,
        sublinks,
        updatedAt: serverTimestamp(),
      });

      navigate("/admin/services");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="text-xs uppercase tracking-widest opacity-60">
        Loading service…
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-3xl"
    >
      <h1 className="text-2xl font-serif mb-10">
        Edit Service
      </h1>

      {/* TITLE */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest mb-2">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
        />
      </div>

      {/* SUBTITLE */}
      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest mb-2">
          Subtitle
        </label>
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="mb-10">
        <label className="block text-xs uppercase tracking-widest mb-2">
          Main Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border border-black/20 bg-transparent p-4 focus:outline-none"
        />
      </div>

      {/* SUBLINKS */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif">
            Service Sublinks
          </h2>
          <button
            onClick={addSubLink}
            className="text-xs uppercase tracking-widest underline"
          >
            Add sublink
          </button>
        </div>

        <div className="space-y-8">
          {sublinks.map((item, index) => (
            <div key={index} className="border border-black/10 p-6">
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Sub-title
                </label>
                <input
                  value={item.title}
                  onChange={(e) =>
                    handleSubLinkChange(index, "title", e.target.value)
                  }
                  className="w-full border-b border-black/30 bg-transparent py-2 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs uppercase tracking-widest mb-2">
                  Content
                </label>
                <textarea
                  value={item.content}
                  onChange={(e) =>
                    handleSubLinkChange(index, "content", e.target.value)
                  }
                  rows={4}
                  className="w-full border border-black/20 bg-transparent p-4 focus:outline-none"
                />
              </div>

              <button
                onClick={() => removeSubLink(index)}
                className="text-xs uppercase tracking-widest text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="border border-black px-10 py-3 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition"
      >
        {saving ? "Saving…" : "Save Service"}
      </button>
    </motion.div>
  );
}
