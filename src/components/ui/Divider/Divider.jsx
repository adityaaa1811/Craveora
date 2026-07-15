import React from "react";

export const Divider = ({
  orientation = "horizontal",
  children,
  className = "",
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  if (!children) {
    return (
      <hr
        className={`${
          isHorizontal
            ? "w-full border-t border-border-light"
            : "h-full border-l border-border-light min-h-[1em] self-stretch"
        } ${className}`}
        aria-orientation={orientation}
        {...props}
      />
    );
  }

  return (
    <div
      className={`flex items-center text-text-muted text-xs font-semibold ${
        isHorizontal ? "w-full flex-row" : "h-full flex-col min-h-[2em] self-stretch"
      } ${className}`}
      {...props}
    >
      <span className={isHorizontal ? "flex-grow border-t border-border-light" : "flex-grow border-l border-border-light"} />
      <span className={isHorizontal ? "px-3" : "py-2"}>{children}</span>
      <span className={isHorizontal ? "flex-grow border-t border-border-light" : "flex-grow border-l border-border-light"} />
    </div>
  );
};

export default Divider;
