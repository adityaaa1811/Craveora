import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../Spinner";

const MotionLink = motion(Link);

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  to,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold tracking-wide rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary",
    secondary: "bg-secondary text-primary hover:bg-secondary-hover active:bg-secondary",
    outline: "border border-primary text-primary hover:bg-primary/5 active:bg-primary/10",
    ghost: "text-primary hover:bg-primary/5 active:bg-primary/10",
    danger: "bg-error text-white hover:bg-error-hover active:bg-error",
    icon: "rounded-full p-2.5 bg-surface border border-border/40 hover:border-primary/20 text-text-secondary hover:text-primary hover:shadow-md"
  };

  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
    icon: "" // Reset sizes for custom icon variant pad
  };

  // Resolve layout size for icon variants
  const resolvedSizeClass = variant === "icon" ? "" : sizeClasses[size];

  if (to) {
    return (
      <MotionLink
        to={to}
        whileTap={!disabled && !isLoading ? { scale: 0.96 } : undefined}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
        aria-disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClasses[variant]} ${resolvedSizeClass} ${className}`}
        {...props}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      whileTap={!disabled && !isLoading ? { scale: 0.96 } : undefined}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${resolvedSizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner variant="ring" size="sm" className="text-current" />
          {variant !== "icon" && <span>Loading...</span>}
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
