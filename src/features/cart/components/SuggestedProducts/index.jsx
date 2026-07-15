import React, { useMemo } from "react";
import { products } from "../../../menu/data/products";
import ProductCard from "../../../menu/components/ProductCard";

export const SuggestedProducts = ({ cartItems = [] }) => {
  const suggestions = useMemo(() => {
    const cartIds = new Set(cartItems.map((item) => item.id));
    
    // Suggest items not already in the cart, prioritizing beverages and desserts
    return products
      .filter((item) => !cartIds.has(item.id))
      .sort((a, b) => {
        const isMainsA = a.category === "beverages" || a.category === "desserts";
        const isMainsB = b.category === "beverages" || b.category === "desserts";
        return isMainsB - isMainsA;
      })
      .slice(0, 4);
  }, [cartItems]);

  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 mt-10 pt-8 border-t border-border-light/80 select-none">
      <div>
        <h3 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight">
          Complete Your Culinary Experience
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Add an exquisite dessert or botanical beverage to complete your meal.
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
        {suggestions.map((product) => (
          <div
            key={product.id}
            className="shrink-0 w-[240px] sm:w-[260px] snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SuggestedProducts;
