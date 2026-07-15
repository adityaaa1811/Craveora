import React from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "../../../../components/ui";

export const SavedForLater = ({ items = [], onMoveToCart, onRemove }) => {
  if (items.length === 0) return null;

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-5 mt-10 pt-8 border-t border-border-light/80 select-none">
      <div>
        <h3 className="text-lg md:text-xl font-extrabold text-text-primary tracking-tight flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary fill-current" />
          <span>Saved for Later</span>
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Items currently in your wishlist. Move them to your bag anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-4 flex gap-4 items-center bg-surface border border-border/30 shadow-sm relative group">
                {/* Image */}
                <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 border border-border-light">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-grow min-w-0 flex flex-col gap-1">
                  <h4 className="text-xs font-bold text-text-primary truncate">
                    {item.title}
                  </h4>
                  <span className="text-xs font-extrabold text-primary">
                    {formatPrice(item.price)}
                  </span>
                  
                  {/* Action triggers */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      onClick={() => onMoveToCart(item)}
                      size="sm"
                      className="px-3.5 py-1.5 text-[10px] h-7 gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </Button>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="p-1 rounded-full text-text-muted hover:text-error transition-colors cursor-pointer ml-auto"
                      aria-label="Delete saved item"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SavedForLater;
