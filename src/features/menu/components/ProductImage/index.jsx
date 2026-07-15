import React, { useState } from "react";
import { motion } from "framer-motion";

export const ProductImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // High-quality SVG fallback for food items
  const fallbackSrc = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23FDF1F3'/><path d='M200 80C140 80 110 120 110 160C110 210 150 220 200 220C250 220 290 210 290 160C290 120 260 80 200 80Z' fill='%23E0A4B0' opacity='0.3'/><text x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%237C0116' opacity='0.7'>Craveora Gourmet</text></svg>";

  return (
    <div className="relative w-full aspect-4/3 bg-neutral-100 overflow-hidden select-none">
      {/* Premium Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 animate-pulse" />
      )}

      <motion.img
        src={hasError ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
  );
};

export default ProductImage;
