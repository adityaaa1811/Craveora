import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Drawer, Button } from "../../../../components/ui";
import { useCart } from "../../hooks/useCart";

export const MiniCart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalQuantity,
    priceBreakdown,
    increaseQuantity,
    decreaseQuantity
  } = useCart();

  const { subtotal } = priceBreakdown;

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      title={`Gourmet Bag (${totalQuantity})`}
    >
      <div className="flex flex-col h-full justify-between select-none">
        {/* Scrollable list items */}
        <div className="flex-grow overflow-y-auto pr-1 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 text-text-muted">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mb-4 stroke-[1.5]" />
              <p className="text-xs font-bold">Your bag is empty</p>
              <p className="text-[10px] max-w-xs mt-1 leading-normal">
                Add exquisite dishes to start discovery.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 py-3 border-b border-border-light/60 last:border-0 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover bg-neutral-100 border border-border-light"
                />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-bold text-text-primary truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-text-muted block mt-0.5">
                    {formatPrice(item.price)} x {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-black border border-border rounded-full hover:bg-neutral-50 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-xs font-extrabold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="w-5 h-5 flex items-center justify-center text-xs font-black border border-border rounded-full hover:bg-neutral-50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pricing calculations footer */}
        {cartItems.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border-light/80">
            <div className="flex justify-between items-center text-sm font-bold text-text-secondary mb-4">
              <span>Subtotal</span>
              <span className="text-primary font-extrabold">{formatPrice(subtotal)}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={handleGoToCart} className="w-full flex items-center justify-center gap-2">
                <span>View Full Bag</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default MiniCart;
