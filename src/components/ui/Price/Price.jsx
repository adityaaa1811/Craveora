import React from "react";

export const Price = ({
  price,
  oldPrice,
  currency = "USD",
  locale = "en-US",
  size = "md",
  className = "",
  ...props
}) => {
  const formatPrice = (value) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }).format(value);
  };

  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  };

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`} {...props}>
      <span
        className={`font-extrabold text-primary ${sizeClasses[size] || sizeClasses.md}`}
        aria-label={`Price: ${formatPrice(price)}`}
      >
        {formatPrice(price)}
      </span>
      
      {oldPrice && oldPrice > price && (
        <>
          <span
            className="text-xs md:text-sm text-text-muted line-through"
            aria-label={`Original price: ${formatPrice(oldPrice)}`}
          >
            {formatPrice(oldPrice)}
          </span>
          {discount && (
            <span
              className="text-[10px] md:text-2xs font-extrabold px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-100 uppercase tracking-wider"
              aria-label={`${discount}% savings`}
            >
              {discount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Price;
