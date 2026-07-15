import React from "react";
import { Star, StarHalf } from "lucide-react";

export const ProductRating = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const roundedRating = Math.round(rating * 10) / 10;

  return (
    <div
      className="flex items-center gap-1.5"
      role="img"
      aria-label={`Rating: ${roundedRating} out of ${maxStars} stars`}
    >
      <div className="flex items-center text-amber-500" aria-hidden="true">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starValue = index + 1;
          if (starValue <= fullStars) {
            return (
              <Star
                key={index}
                className="w-4 h-4 fill-current stroke-current"
              />
            );
          } else if (starValue === fullStars + 1 && hasHalfStar) {
            return (
              <StarHalf
                key={index}
                className="w-4 h-4 fill-current stroke-current"
              />
            );
          } else if (starValue === fullStars + 1 && rating % 1 >= 0.75) {
            // Treat as full star
            return (
              <Star
                key={index}
                className="w-4 h-4 fill-current stroke-current"
              />
            );
          } else {
            return (
              <Star
                key={index}
                className="w-4 h-4 text-neutral-300 stroke-current"
              />
            );
          }
        })}
      </div>
      <span className="text-xs font-semibold text-text-secondary">
        {roundedRating}
      </span>
    </div>
  );
};

export default ProductRating;
