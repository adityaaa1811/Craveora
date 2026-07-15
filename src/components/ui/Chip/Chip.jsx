import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export const Chip = ({
  children,
  selected = false,
  onSelect,
  onRemove,
  disabled = false,
  className = "",
  ...props
}) => {
  const isClickable = !!onSelect && !disabled;

  return (
    <motion.div
      whileTap={isClickable ? { scale: 0.96 } : undefined}
      onClick={isClickable ? onSelect : undefined}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold select-none border transition-all duration-300 ${
        selected
          ? "bg-primary border-primary text-white"
          : "bg-surface border-border/40 text-text-secondary hover:text-primary hover:border-primary/20"
      } ${isClickable ? "cursor-pointer" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      <span>{children}</span>

      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation(); // Avoid triggering onSelect
            if (!disabled) onRemove();
          }}
          className={`p-0.5 rounded-full hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-primary transition-colors cursor-pointer ${
            selected ? "text-white/80 hover:text-white" : "text-text-muted hover:text-primary"
          }`}
          aria-label="Remove filter"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
};

export default Chip;
