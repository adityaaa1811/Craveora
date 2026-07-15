import React from "react";
import { Rating, Price, Badge } from "../../../../components/ui";

export const ProductInfo = ({ product }) => {
  if (!product) return null;
  const { title, category, rating, reviewCount, price, oldPrice, description, badge } = product;

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleReviewScroll = () => {
    const tabContainer = document.getElementById("product-tabs-container");
    if (tabContainer) {
      tabContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category & Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="primary">{capitalize(category)}</Badge>
        {badge && <Badge variant="secondary">{badge}</Badge>}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight leading-tight">
        {title}
      </h1>

      {/* Ratings */}
      <div className="flex items-center gap-3">
        <Rating rating={rating} />
        <button
          onClick={handleReviewScroll}
          className="text-xs font-semibold text-text-muted hover:text-primary transition-colors hover:underline cursor-pointer"
        >
          ({reviewCount} reviews)
        </button>
      </div>

      {/* Pricing */}
      <Price price={price} oldPrice={oldPrice} size="lg" />

      {/* Description */}
      <p className="text-sm md:text-base text-text-secondary leading-relaxed mt-2 border-t border-border-light/80 pt-4">
        {description}
      </p>
    </div>
  );
};

export default ProductInfo;
