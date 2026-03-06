import { motion, AnimatePresence } from "framer-motion";

/**
 * Modal
 *
 * props:
 *  - open (boolean)
 *  - onClose (function)
 *  - children (node)
 */
export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40"
        />

        {/* MODAL CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-[#f5f2ee] max-w-lg w-full p-10"
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-xs uppercase tracking-widest opacity-60 hover:opacity-100"
          >
            Close
          </button>

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
