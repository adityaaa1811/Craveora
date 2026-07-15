import React from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

export const QuantitySelector = ({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  className = "",
  ...props
}) => {
  const handleDecrement = () => {
    if (disabled) return;
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (disabled) return;
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    if (disabled) return;
    const parsedVal = parseInt(e.target.value, 10);
    if (isNaN(parsedVal)) return;

    if (parsedVal >= min && parsedVal <= max) {
      onChange(parsedVal);
    }
  };

  return (
    <div
      className={`inline-flex items-center bg-surface border border-border/40 rounded-full p-1.5 gap-1 shadow-sm select-none ${className}`}
      {...props}
    >
      {/* Minus Button */}
      <motion.button
        whileTap={!disabled && value > min ? { scale: 0.9 } : undefined}
        type="button"
        disabled={disabled || value <= min}
        onClick={handleDecrement}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent text-text-secondary focus-visible:outline-2 focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </motion.button>

      {/* Value Input Box */}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        className="w-10 text-center font-extrabold text-sm text-text-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Quantity amount"
      />

      {/* Plus Button */}
      <motion.button
        whileTap={!disabled && value < max ? { scale: 0.9 } : undefined}
        type="button"
        disabled={disabled || value >= max}
        onClick={handleIncrement}
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent text-text-secondary focus-visible:outline-2 focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </div>
  );
};

export default QuantitySelector;
