import React from "react";
import { Trash2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { QuantitySelector } from "../../../../components/ui";

export const CartItem = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onMoveToWishlist
}) => {
  const { id, title, price, image, quantity, totalPrice } = item;

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 p-4 md:p-5 rounded-2xl border border-border/30 bg-surface shadow-sm hover:shadow-md transition-shadow select-none items-center"
    >
      {/* Product Image */}
      <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-neutral-100 border border-border-light">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Item Details */}
      <div className="flex-grow flex flex-col gap-1 min-w-0">
        <h3 className="text-sm md:text-base font-bold text-text-primary truncate">
          {title}
        </h3>
        <span className="text-xs text-text-muted">
          Unit price: {formatPrice(price)}
        </span>
        
        {/* Total Price */}
        <span className="text-sm font-extrabold text-primary mt-1 md:hidden">
          {formatPrice(totalPrice)}
        </span>

        {/* Action Controls for Mobile */}
        <div className="flex items-center gap-3 mt-2 md:hidden">
          <QuantitySelector
            value={quantity}
            onChange={(val) => {
              if (val > quantity) onIncrease(id);
              else onDecrease(id);
            }}
          />
        </div>
      </div>

      {/* Actions & Pricing Columns for Desktop */}
      <div className="hidden md:flex flex-col items-center gap-2 shrink-0 px-2">
        <span className="text-2xs text-text-muted font-bold uppercase tracking-wider select-none">
          Quantity
        </span>
        <QuantitySelector
          value={quantity}
          onChange={(val) => {
            if (val > quantity) onIncrease(id);
            else onDecrease(id);
          }}
        />
      </div>

      <div className="hidden md:flex flex-col items-end gap-1 shrink-0 min-w-[90px] px-2 text-right">
        <span className="text-2xs text-text-muted font-bold uppercase tracking-wider select-none">
          Total
        </span>
        <span className="text-base font-extrabold text-primary">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Action Buttons (Remove & Save) */}
      <div className="flex flex-col gap-2 shrink-0 pl-2">
        {/* Save to Wishlist */}
        {onMoveToWishlist && (
          <button
            type="button"
            onClick={() => onMoveToWishlist(item)}
            className="p-2 rounded-full hover:bg-neutral-100 text-text-secondary hover:text-primary transition-colors cursor-pointer"
            aria-label="Save for later"
            title="Save for later"
          >
            <Heart className="w-4 h-4" />
          </button>
        )}

        {/* Remove item */}
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="p-2 rounded-full hover:bg-neutral-100 text-text-secondary hover:text-error transition-colors cursor-pointer"
          aria-label="Remove item from cart"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.article>
  );
};

export default CartItem;
