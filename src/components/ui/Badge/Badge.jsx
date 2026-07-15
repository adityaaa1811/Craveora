import React from "react";

const BADGE_THEMES = {
  primary: "bg-primary-light text-primary border border-primary/20",
  secondary: "bg-secondary-light text-primary border border-secondary/20",
  success: "bg-success-light text-success border border-success/20",
  warning: "bg-warning-light text-warning border border-warning/20",
  danger: "bg-error-light text-error border border-error/20",
  neutral: "bg-neutral-100 text-text-secondary border border-border"
};

export const Badge = ({
  children,
  variant = "neutral",
  className = "",
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs md:text-xs font-bold uppercase tracking-wider ${
        BADGE_THEMES[variant] || BADGE_THEMES.neutral
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
