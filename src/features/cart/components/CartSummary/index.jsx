import React from "react";
import { CreditCard } from "lucide-react";
import { Button, Card } from "../../../../components/ui";

export const CartSummary = ({ priceBreakdown, discountPercent = 0, onCheckout }) => {
  const { subtotal, discountAmount, tax, deliveryFee, grandTotal } = priceBreakdown;

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  return (
    <Card className="p-6 flex flex-col gap-5 select-none w-full bg-surface shadow-md">
      <h3 className="text-base font-extrabold text-text-primary tracking-tight pb-3 border-b border-border-light/80">
        Order Summary
      </h3>

      <div className="flex flex-col gap-3 text-sm text-text-secondary">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span className="font-bold text-text-primary">{formatPrice(subtotal)}</span>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-success-hover font-medium">
            <span>Discount ({discountPercent}%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        {/* Delivery */}
        <div className="flex justify-between items-center">
          <span>Delivery Fee</span>
          {deliveryFee === 0 ? (
            <span className="text-success font-bold uppercase text-2xs tracking-wider">
              Free Delivery
            </span>
          ) : (
            <span className="font-bold text-text-primary">{formatPrice(deliveryFee)}</span>
          )}
        </div>

        {/* Tax */}
        <div className="flex justify-between items-center">
          <span>Estimated Tax (8%)</span>
          <span className="font-bold text-text-primary">{formatPrice(tax)}</span>
        </div>

        {/* Divider */}
        <hr className="border-t border-border-light/80 my-2" />

        {/* Grand Total */}
        <div className="flex justify-between items-center text-base md:text-lg text-text-primary font-black">
          <span>Grand Total</span>
          <span className="text-primary">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        onClick={onCheckout}
        disabled={subtotal === 0}
        className="w-full mt-2 py-4 flex items-center justify-center gap-2"
      >
        <CreditCard className="w-4 h-4" />
        <span>Proceed to Checkout</span>
      </Button>

      {/* Safe Checkout Disclaimer */}
      <p className="text-[10px] text-text-muted text-center leading-normal">
        Free delivery applies to orders exceeding $50.00. Taxes are computed based on delivery locations.
      </p>
    </Card>
  );
};

export default CartSummary;
