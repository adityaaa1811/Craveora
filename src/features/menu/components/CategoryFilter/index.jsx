import React, { useRef } from "react";
import { motion } from "framer-motion";

export const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-2">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto py-2 px-1 snap-x scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 snap-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none ${
                isActive ? "text-white" : "text-text-secondary hover:text-primary bg-surface border border-border/40 hover:border-primary/20"
              }`}
              aria-pressed={isActive}
            >
              {/* Background Pill Transition */}
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-primary rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>
      
      {/* Scrollbar-hide support styling */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryFilter;
