import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * HeroButtons Component
 * Renders the primary and secondary call-to-actions for the Hero section.
 */
const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-start">
      {/* Primary CTA button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full sm:w-auto"
      >
        <Link
          to="/menu"
          className="block px-8 py-4 bg-primary text-white hover:bg-primary-hover text-xs font-bold tracking-widest uppercase rounded-none shadow-md transition-colors text-center"
        >
          Explore Menu
        </Link>
      </motion.div>

      {/* Secondary CTA button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full sm:w-auto"
      >
        <Link
          to="/about"
          className="block px-8 py-4 border border-border bg-white/40 backdrop-blur-sm text-text-primary hover:bg-white text-xs font-bold tracking-widest uppercase rounded-none transition-colors text-center"
        >
          Our Story
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
