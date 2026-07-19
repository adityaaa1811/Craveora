import React from "react";
import { motion } from "framer-motion";

export const RouteLoader = () => {
  return (
    <div className="relative min-h-[400px] w-full flex flex-col items-center justify-center bg-transparent">
      {/* Localized top viewport progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0.9 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />
      <div className="flex flex-col items-center gap-3 py-16">
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-slate-800 border-t-amber-500 animate-spin" />
        </div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">
          Gourmet Studio Loading...
        </p>
      </div>
    </div>
  );
};

export default RouteLoader;
