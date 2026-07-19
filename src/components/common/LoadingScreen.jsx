import React from "react";
import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white">
      {/* Sleek progress bar top boundary */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-primary to-amber-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <div className="flex flex-col items-center gap-6">
        <motion.h1
          className="text-5xl font-black font-serif tracking-wider text-amber-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Craveora
        </motion.h1>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <span>Preparing Gourmet Experience</span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
