import React, { useMemo } from "react";
import { products } from "../../../menu/data/products";
import ProductCard from "../../../menu/components/ProductCard";

export const RecommendedProducts = ({ 
  category, 
  currentProductId, 
  title = "Recommended Gourmet Pairings", 
  description = "Hand-picked delicacies that perfectly match your selection.",
  filterType = "related" 
}) => {
  const recommendations = useMemo(() => {
    return products
      .filter((item) => {
        // Exclude current item
        if (item.id === currentProductId) return false;
        
        if (filterType === "related") {
          return item.category === category;
        } else {
          // Cross-sell: show items from other categories (e.g. drinks, desserts, starters if main)
          return item.category !== category;
        }
      })
      .slice(0, 4); // Limit to 4 items
  }, [category, currentProductId, filterType]);

  if (recommendations.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-12 pt-8 border-t border-border-light/80 select-none">
      <div>
        <h3 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-text-muted mt-1">
          {description}
        </p>
      </div>

      {/* Horizontal Scroller */}
      <div
        className="flex items-stretch gap-4 md:gap-6 overflow-x-auto pb-4 snap-x scroll-smooth no-scrollbar animate-fadeIn"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[260px] sm:w-[280px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Local scrollbar-hide support style */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
};

export default RecommendedProducts;
