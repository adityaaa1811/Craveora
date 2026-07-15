import React, { useMemo } from "react";
import { products } from "../../../menu/data/products";
import ProductCard from "../../../menu/components/ProductCard";

export const RecommendedProducts = ({ category, currentProductId }) => {
  const recommendations = useMemo(() => {
    return products
      .filter((item) => item.category === category && item.id !== currentProductId)
      .slice(0, 4); // Limit to 4 related items
  }, [category, currentProductId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-12 pt-8 border-t border-border-light/80">
      <div>
        <h3 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">
          Recommended Gourmet Pairings
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Hand-picked delicacies that perfectly match your selection.
        </p>
      </div>

      {/* Horizontal Scroller */}
      <div
        className="flex items-stretch gap-4 md:gap-6 overflow-x-auto pb-4 snap-x scroll-smooth no-scrollbar"
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
