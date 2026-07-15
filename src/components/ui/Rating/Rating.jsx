import React, { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import { motion } from "framer-motion";

export const Rating = ({
  rating = 0,
  maxStars = 5,
  interactive = false,
  onChange,
  className = "",
  ...props
}) => {
  const [hoverRating, setHoverRating] = useState(null);

  const fullStars = Math.floor(hoverRating !== null ? hoverRating : rating);
  const hasHalfStar =
    hoverRating === null && rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundedRating = Math.round(rating * 10) / 10;

  const handleStarClick = (starValue) => {
    if (interactive && onChange) {
      onChange(starValue);
    }
  };

  const handleStarMouseEnter = (starValue) => {
    if (interactive) {
      setHoverRating(starValue);
    }
  };

  const handleStarMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={
        interactive
          ? "Rate out of " + maxStars + " stars"
          : `Rating: ${roundedRating} out of ${maxStars} stars`
      }
      {...props}
    >
      <div className="flex items-center text-amber-500">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          const isInteractiveBtn = interactive;

          const StarComponent = isInteractiveBtn ? motion.button : "div";
          const starProps = isInteractiveBtn
            ? {
                type: "button",
                onClick: () => handleStarClick(starValue),
                onMouseEnter: () => handleStarMouseEnter(starValue),
                onMouseLeave: handleStarMouseLeave,
                whileTap: { scale: 0.9 },
                className: "focus-visible:outline-2 focus-visible:outline-primary p-0.5 rounded-sm cursor-pointer",
                "aria-checked": rating >= starValue,
                role: "radio"
              }
            : { className: "p-0.5" };

          let fillState = "empty";
          if (starValue <= fullStars) {
            fillState = "full";
          } else if (starValue === fullStars + 1) {
            if (hasHalfStar) {
              fillState = "half";
            } else if (hoverRating === null && rating % 1 >= 0.75) {
              fillState = "full";
            }
          }

          return (
            <StarComponent key={index} {...starProps}>
              {fillState === "full" ? (
                <Star className="w-4 h-4 fill-current stroke-current" />
              ) : fillState === "half" ? (
                <StarHalf className="w-4 h-4 fill-current stroke-current" />
              ) : (
                <Star className="w-4 h-4 text-neutral-300 stroke-current" />
              )}
            </StarComponent>
          );
        })}
      </div>
      {!interactive && (
        <span className="text-xs font-semibold text-text-secondary select-none">
          {roundedRating}
        </span>
      )}
    </div>
  );
};

export default Rating;
