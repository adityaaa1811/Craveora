import React from "react";
import { motion } from "framer-motion";

/**
 * HeroImage Component
 * Renders the high-end gourmet dish photograph with ambient glows, slow floating
 * animations, and interactive floating informational badge cards.
 */
const HeroImage = () => {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto flex items-center justify-center select-none">
      {/* Decorative ambient color glow underneath the image */}
      <div className="absolute w-[85%] h-[85%] rounded-full bg-secondary/15 blur-3xl -z-10 animate-pulse" />

      {/* Floating Image Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 1, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full aspect-square border border-border/40 p-4 bg-surface/50 backdrop-blur-md shadow-premium rounded-3xl"
      >
        {/* Gourmet Plating Image Asset */}
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-md">
          <motion.img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
            alt="Gourmet Plating"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
          />
        </div>

        {/* Floating Info Card 1: Fresh Today */}
        <motion.div
          className="absolute -top-3 -left-4 bg-surface border border-border px-3 py-2 flex items-center space-x-2 shadow-lg rounded-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
        >
          {/* Active Status Pulse Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black tracking-widest uppercase text-text-primary">
            Fresh Today
          </span>
        </motion.div>

        {/* Floating Info Card 2: 20 min delivery */}
        <motion.div
          className="absolute -bottom-3 -right-4 bg-surface border border-border px-3 py-2 flex items-center space-x-2 shadow-lg rounded-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
        >
          {/* Icon Clock */}
          <svg
            className="w-3.5 h-3.5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-[10px] font-black tracking-widest uppercase text-text-primary">
            20 Min Delivery
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroImage;
