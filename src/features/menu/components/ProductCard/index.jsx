import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ProductImage from "../ProductImage";
import ProductBadge from "../ProductBadge";
import ProductRating from "../ProductRating";
import ProductPrice from "../ProductPrice";

export const ProductCard = ({ product }) => {
  const { title, description, price, oldPrice, rating, image, badge } = product;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between h-full bg-surface rounded-2xl border border-border/40 overflow-hidden shadow-md hover:shadow-premium transition-all duration-300"
    >
      <div>
        {/* Image Container with Badge Overlay */}
        <div className="relative overflow-hidden">
          <ProductImage src={image} alt={title} />
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              <ProductBadge label={badge} />
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-4 md:p-5 flex flex-col gap-2">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug">
              {title}
            </h3>
          </div>

          <ProductRating rating={rating} />

          {/* Description - clamped for visual grid consistency */}
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        </div>
      </div>

      {/* Pricing & Call to Action Footer */}
      <div className="p-4 md:p-5 pt-0 mt-auto flex items-center justify-between gap-4 border-t border-border-light/80">
        <ProductPrice price={price} oldPrice={oldPrice} />
        
        {/* Accessible Quick Add Action (Cart functionality disabled as per request) */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label={`Quick add ${title} to selection`}
          title={`Add ${title}`}
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
