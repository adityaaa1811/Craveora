import React from "react";
import { motion } from "framer-motion";

const BADGE_THEMES = {
  "Chef's Choice": "bg-primary text-white border border-primary/20 shadow-sm",
  "Best Seller": "bg-amber-100 text-amber-900 border border-amber-200",
  "New": "bg-emerald-100 text-emerald-900 border border-emerald-200",
  "Limited": "bg-rose-100 text-rose-900 border border-rose-200"
};

export const ProductBadge = ({ label }) => {
  if (!label || !BADGE_THEMES[label]) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${BADGE_THEMES[label]}`}
    >
      {label}
    </motion.div>
  );
};

export default ProductBadge;
