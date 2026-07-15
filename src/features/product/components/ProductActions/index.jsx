import React, { useState } from "react";
import { Heart, Share2, ShoppingBag } from "lucide-react";
import { toast } from "react-hot-toast";
import { Button, QuantitySelector } from "../../../../components/ui";

export const ProductActions = ({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
      toast.success(`Added ${quantity} ${product.title} to your bag!`);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div className="flex flex-col gap-5 border-t border-b border-border-light/80 py-5">
      {/* Selector & Actions */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Quantity Selection */}
        <div className="flex flex-col gap-1.5">
          <span className="text-2xs text-text-muted font-bold uppercase tracking-wider pl-1">
            Quantity
          </span>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        {/* Add to Cart button */}
        <div className="flex-grow flex flex-col gap-1.5">
          <span className="text-2xs text-transparent font-bold uppercase tracking-wider select-none">
            Spacer
          </span>
          <Button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Gourmet Bag
          </Button>
        </div>
      </div>

      {/* Auxiliary actions */}
      <div className="flex items-center justify-between gap-4 flex-wrap text-sm text-text-secondary select-none">
        {/* Wishlist Toggle Button */}
        <button
          onClick={onToggleWishlist}
          className={`flex items-center gap-2 font-semibold hover:text-primary transition-colors cursor-pointer group ${
            isWishlisted ? "text-primary" : "text-text-secondary"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              isWishlisted ? "fill-current text-primary" : "text-primary"
            }`}
          />
          <span>{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
        </button>

        {/* Share Action */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 font-semibold hover:text-primary transition-colors cursor-pointer group"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          <span>Share Product</span>
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
