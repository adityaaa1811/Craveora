import React from "react";

export const ProductPrice = ({ price, oldPrice }) => {
  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className="text-lg font-bold text-primary" aria-label={`Current price: ${formatPrice(price)}`}>
        {formatPrice(price)}
      </span>
      {oldPrice && (
        <>
          <span
            className="text-sm text-text-muted line-through"
            aria-label={`Original price: ${formatPrice(oldPrice)}`}
          >
            {formatPrice(oldPrice)}
          </span>
          {discount && (
            <span
              className="text-2xs font-extrabold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-100"
              aria-label={`${discount}% discount`}
            >
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPrice;
