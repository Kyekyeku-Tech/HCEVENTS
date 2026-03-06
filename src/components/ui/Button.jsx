import { motion } from "framer-motion";
import clsx from "clsx";

/**
 * Button
 *
 * variants:
 *  - primary
 *  - outline
 *
 * sizes:
 *  - sm
 *  - md
 *  - lg
 */
export default function Button({
  children,
  onClick,
  type = "button",
  variant = "outline",
  size = "md",
  disabled = false,
  className,
}) {
  const base =
    "inline-flex items-center justify-center uppercase tracking-widest transition focus:outline-none";

  const variants = {
    primary:
      "bg-black text-white hover:bg-black/90",
    outline:
      "border border-black text-black hover:bg-black hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-8 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
