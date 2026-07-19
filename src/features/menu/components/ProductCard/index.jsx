import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Heart } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addItem as addToCart } from "../../../../store/slices/cartSlice";
import { toggleWishlist, selectWishlistItems } from "../../../../store/slices/wishlistSlice";
import ProductImage from "../ProductImage";
import ProductBadge from "../ProductBadge";
import ProductRating from "../ProductRating";
import ProductPrice from "../ProductPrice";
import { preloadRoute } from "../../../../routes/preloader";

export const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const { id, title, description, price, oldPrice, rating, image, badge } = product;

  // Select wishlist items to check active states
  const wishlistItems = useAppSelector(selectWishlistItems);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`Added ${title} to your bag!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.success("Removed from wishlist.");
    } else {
      toast.success("Saved to wishlist!");
    }
  };

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
      {/* Product Image Link and Wishlist Overlay */}
      <div className="relative overflow-hidden aspect-video">
        <Link 
          to={`/menu/${id}`} 
          className="block w-full h-full"
          onMouseEnter={() => preloadRoute(`/menu/${id}`)}
          onFocus={() => preloadRoute(`/menu/${id}`)}
        >
          <ProductImage src={image} alt={title} />
        </Link>
        
        {/* Category/Badge Overlay */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <ProductBadge label={badge} />
          </div>
        )}

        {/* Wishlist toggle overlay - outside of the Link */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-surface/80 backdrop-blur-xs text-text-secondary hover:text-primary hover:bg-surface shadow-sm transition-all cursor-pointer"
          aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 hover:scale-110 ${
              isWishlisted ? "fill-current text-primary" : "text-current"
            }`}
          />
        </button>
      </div>

      {/* Details and Pricing Actions - split into siblings of Link */}
      <div className="flex-grow flex flex-col justify-between">
        <Link 
          to={`/menu/${id}`} 
          className="p-4 md:p-5 flex flex-col gap-2 flex-grow hover:no-underline"
          onMouseEnter={() => preloadRoute(`/menu/${id}`)}
          onFocus={() => preloadRoute(`/menu/${id}`)}
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs md:text-sm font-bold text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug truncate w-full">
              {title}
            </h3>
          </div>

          <ProductRating rating={rating} />

          {/* Description - clamped for visual grid consistency */}
          <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2 mt-1">
            {description}
          </p>
        </Link>

        {/* Pricing & Call to Action Footer - outside of the Link */}
        <div className="p-4 md:p-5 pt-0 mt-auto flex items-center justify-between gap-4 border-t border-border-light/80 z-10">
          <ProductPrice price={price} oldPrice={oldPrice} />
          
          {/* Quick Add Action - outside of the Link */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickAdd}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-white transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
            aria-label={`Quick add ${title} to bag`}
            title={`Add ${title}`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
