import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProductGallery = ({ gallery = [], title = "Product Image" }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (gallery.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Main Image View */}
      <div className="relative aspect-4/3 rounded-3xl border border-border/40 bg-surface overflow-hidden shadow-md">
        <AnimatePresence mode="wait">
          <motion.img
            key={gallery[activeIndex]}
            src={gallery[activeIndex]}
            alt={`${title} - view ${activeIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail Navigations Row */}
      {gallery.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {gallery.map((imgUrl, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 w-20 aspect-4/3 rounded-xl overflow-hidden border-2 bg-surface shadow-2xs transition-all duration-300 cursor-pointer ${
                  isActive ? "border-primary scale-102" : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`Show gallery image ${index + 1}`}
              >
                <img
                  src={imgUrl}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
