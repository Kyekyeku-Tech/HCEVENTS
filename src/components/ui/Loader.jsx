import React from "react";

import { motion } from "framer-motion";

export default function Loader({ label = "Loading" }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="font-serif text-lg tracking-wide"
      >
        {label}
      </motion.div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="h-[1px] bg-black mt-4"
      />
    </div>
  );
}
