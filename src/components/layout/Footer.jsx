import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white mt-40">
      {/* INSTAGRAM ROW */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 mb-32">
        <p className="font-serif text-[12px] tracking-widest text-black/40 mb-12 uppercase">
          Recently on Instagram
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://i.ibb.co/1Ynd8Pnf/igpost1.png",
            "https://i.ibb.co/x8XY6HP6/igpost2.png",
            "https://i.ibb.co/TD8pzcSH/igpost3.png",
            "https://i.ibb.co/Y7Kp1Wrk/igpost4.png",
          ].map((img, i) => (
            <div key={i} className="overflow-hidden aspect-square">
              <img
                src={img}
                alt="Instagram post"
                className="w-full h-full object-cover transition duration-500 hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-8 md:px-20 pb-24 grid grid-cols-1 md:grid-cols-2 gap-24"
      >
        {/* ABOUT */}
        <div>
          <p className="font-serif text-sm mb-6">
            About HC Events
          </p>
          <p className="text-xs leading-relaxed text-black/60 max-w-sm font-light">
            We are a full service design studio creating refined, intimate
            celebrations. Our work is rooted in thoughtful storytelling,
            understated elegance, and a deep appreciation for craft.
          </p>
        </div>

        {/* CONTACT */}
        <div className="md:text-right">
          <p className="font-serif text-sm mb-6">
            Contact
          </p>

          <p className="text-xs text-black/60 mb-2 font-light">
            hello@hcevents.com
          </p>

          <p className="text-xs text-black/60 mb-8 font-light">
            +233 553 586 655
          </p>

          <Link
            to="/privacy"
            className="text-[10px] tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            Privacy & Terms
          </Link>

          <p className="text-[10px] text-black/30 mt-8 tracking-widest">
            © {new Date().getFullYear()} HC Events
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
