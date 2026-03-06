import { motion } from "framer-motion";

/**
 * CalendarPicker
 * Controlled component
 *
 * props:
 *  - date (string)
 *  - time (string)
 *  - onDateChange (fn)
 *  - onTimeChange (fn)
 */
export default function CalendarPicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* DATE */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Preferred Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
          required
        />
      </div>

      {/* TIME */}
      <div>
        <label className="block text-xs uppercase tracking-widest mb-2">
          Preferred Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="w-full border border-black/30 bg-transparent py-3 px-2 focus:outline-none"
          required
        />
        <p className="text-xs opacity-60 mt-2">
          We’ll confirm availability via email.
        </p>
      </div>
    </motion.div>
  );
}
