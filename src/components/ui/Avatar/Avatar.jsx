import React, { useState } from "react";

export const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  className = "",
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base"
  };

  const getInitials = (text) => {
    if (!text) return "?";
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-primary-light border border-secondary/20 text-primary font-bold overflow-hidden select-none shrink-0 ${
        sizeClasses[size] || sizeClasses.md
      } ${className}`}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
