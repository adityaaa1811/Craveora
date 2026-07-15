import React from "react";
import { Utensils } from "lucide-react";
import Button from "../Button";

export const EmptyState = ({
  icon: Icon = Utensils,
  title = "No Items Found",
  description = "There are currently no items available to display.",
  actionLabel,
  onAction,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 bg-surface border border-border/40 rounded-3xl max-w-md mx-auto my-12 shadow-sm ${className}`}
      {...props}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-light text-primary mb-5 select-none" aria-hidden="true">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-xs md:text-sm text-text-secondary mb-6 max-w-xs leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
