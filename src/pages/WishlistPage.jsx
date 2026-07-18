import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectWishlistItems, toggleWishlist } from "../store/slices/wishlistSlice";
import { addItem } from "../store/slices/cartSlice";
import { Card, Button } from "../components/ui";

export const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const handleMoveToCart = (item) => {
    // 1. Add to Redux cart
    dispatch(addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1
    }));
    
    // 2. Remove from Redux wishlist
    dispatch(toggleWishlist(item));
    toast.success(`Moved ${item.title} to your bag!`);
  };

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
    toast.success("Removed from wishlist.");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary mb-2">
          <Heart className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider">
          Your Wishlist is Empty
        </h3>
        <p className="text-xs text-text-muted max-w-xs mt-1 leading-normal">
          Save your favored delicacies to purchase them quickly next time.
        </p>
        <Link to="/menu" className="mt-4">
          <Button size="sm" className="px-6 gap-2 text-xs tracking-wider">
            <span>BROWSE MENU</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-black text-text-primary uppercase tracking-wider pl-1 select-none">
        My Gourmet Wishlist ({wishlistItems.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wishlistItems.map((item) => (
          <Card 
            key={item.id} 
            className="p-4 border border-border/30 bg-surface shadow-sm hover:shadow-md transition-all flex gap-4 items-center"
          >
            <Link to={`/menu/${item.id}`} className="shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 rounded-xl object-cover bg-neutral-100 border border-border-light cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
            
            <div className="flex-grow min-w-0 flex flex-col gap-1">
              <h4 className="text-xs font-bold text-text-primary truncate">
                {item.title}
              </h4>
              <span className="text-xs font-extrabold text-primary">
                {formatPrice(item.price)}
              </span>
              
              <div className="flex gap-3.5 mt-3 select-none">
                <Button
                  onClick={() => handleMoveToCart(item)}
                  size="sm"
                  className="h-8 px-3 text-[10px] gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </Button>
                
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="flex items-center gap-1 text-[10px] font-extrabold text-text-secondary hover:text-error transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
