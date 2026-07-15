import React from "react";
import { AnimatePresence } from "framer-motion";
import CartItem from "../CartItem";

export const CartList = ({
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
  onMoveToWishlist
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
            onMoveToWishlist={onMoveToWishlist}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CartList;
