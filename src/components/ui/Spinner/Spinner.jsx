import React from "react";

export const Spinner = ({ variant = "classic", size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5"
  };

  if (variant === "dots") {
    return (
      <div className={`flex items-center gap-1 justify-center ${className}`} role="status" aria-label="Loading">
        <span className={`rounded-full bg-current animate-bounce ${dotSizeClasses[size]}`} style={{ animationDelay: "0ms" }} />
        <span className={`rounded-full bg-current animate-bounce ${dotSizeClasses[size]}`} style={{ animationDelay: "150ms" }} />
        <span className={`rounded-full bg-current animate-bounce ${dotSizeClasses[size]}`} style={{ animationDelay: "300ms" }} />
      </div>
    );
  }

  if (variant === "ring") {
    return (
      <div
        className={`animate-spin rounded-full border-t-transparent border-current ${sizeClasses[size]} ${className}`}
        role="status"
        aria-label="Loading"
      />
    );
  }

  // default: classic
  return (
    <div
      className={`animate-spin rounded-full border-neutral-300 border-t-current ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
