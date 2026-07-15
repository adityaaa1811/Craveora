import React from "react";

export const Skeleton = ({
  variant = "text",
  className = "",
  width,
  height,
  ...props
}) => {
  const baseClasses = "bg-neutral-200 animate-pulse";

  const variantClasses = {
    text: "h-3 rounded w-full mb-2 last:mb-0",
    circle: "rounded-full shrink-0",
    image: "rounded-2xl aspect-4/3 w-full",
    card: "rounded-2xl border border-border/20 p-5 flex flex-col justify-between"
  };

  const style = {
    width: width || undefined,
    height: height || undefined
  };

  if (variant === "card") {
    return (
      <div className={`${baseClasses} ${variantClasses.card} ${className}`} style={style} {...props}>
        <div>
          <div className="w-full aspect-4/3 bg-neutral-300 rounded-xl mb-4" />
          <div className="h-4 bg-neutral-300 rounded w-3/4 mb-3" />
          <div className="h-3 bg-neutral-300 rounded w-1/2 mb-3" />
          <div className="h-3 bg-neutral-300 rounded w-full mb-2" />
          <div className="h-3 bg-neutral-300 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-300/40">
          <div className="h-5 bg-neutral-300 rounded w-1/4" />
          <div className="h-8 w-8 bg-neutral-300 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.text} ${className}`}
      style={style}
      {...props}
    />
  );
};

export default Skeleton;
