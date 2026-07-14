import React from "react";
import { motion } from "framer-motion";

/**
 * HeroBadge Component
 * Renders a small, elegant badge representing brand trust.
 */
const HeroBadge = () => {
  return (
    <motion.div
      className="inline-flex items-center space-x-2 border border-border px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm self-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-[10px] text-amber-500 font-bold tracking-wider">
        ★★★★★
      </span>
      <span className="text-[11px] text-text-secondary font-semibold uppercase tracking-wider">
        Trusted by food lovers
      </span>
    </motion.div>
  );
};

export default HeroBadge;
