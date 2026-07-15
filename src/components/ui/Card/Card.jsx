import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  variant = "default",
  hoverable = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = "rounded-2xl border border-border/40 overflow-hidden bg-surface transition-all duration-300";

  const variantClasses = {
    default: "shadow-md hover:shadow-lg",
    glass: "bg-surface/60 backdrop-blur-md border border-white/20 shadow-premium",
    product: "shadow-md hover:shadow-premium flex flex-col justify-between h-full",
    category: "flex flex-col items-center justify-center p-6 text-center shadow-sm",
    review: "p-6 md:p-8 shadow-md border-l-4 border-l-primary"
  };

  const hoverClasses = hoverable && variant !== "glass" ? "hover:-translate-y-1.5 duration-300" : "";
  const cursorClass = onClick ? "cursor-pointer" : "";

  const Component = onClick ? motion.div : "div";
  const motionProps = onClick
    ? {
        whileTap: { scale: 0.98 },
        whileHover: hoverable ? { y: -6 } : undefined,
        onClick
      }
    : {};

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${cursorClass} ${className}`}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

// Sub-components for flexible slot layouts
export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-5 pb-2 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-5 pt-2 pb-3 flex-grow ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-5 pt-2 border-t border-border-light/80 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
