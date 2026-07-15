import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";

export const EmptyState = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center p-8 md:p-12 bg-surface border border-border/40 rounded-3xl max-w-md mx-auto my-12 shadow-sm"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-light text-primary mb-6 animate-pulse">
        <UtensilsCrossed className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-text-primary mb-2">
        No Gourmet Dishes Found
      </h3>
      
      <p className="text-sm text-text-secondary mb-6 max-w-xs leading-relaxed">
        We couldn&apos;t find any items matching your current search or selected category. Try resetting filters to explore the rest of our menu.
      </p>

      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/20"
      >
        Reset All Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;
