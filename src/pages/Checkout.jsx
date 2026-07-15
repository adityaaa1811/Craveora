import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingBag, CreditCard, Landmark } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCart } from "../features/cart/hooks/useCart";
import { Button, Card } from "../components/ui";

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, priceBreakdown, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: "", address: "", city: "", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvc: "" });
  const [errors, setErrors] = useState({});

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const validate = () => {
    const tempErrors = {};
    if (!shippingInfo.name.trim()) tempErrors.name = "Full Name is required";
    if (!shippingInfo.address.trim()) tempErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) tempErrors.city = "City is required";
    if (!/^\d{5,6}$/.test(shippingInfo.zip.trim())) tempErrors.zip = "Valid Zip Code is required";
    
    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardInfo.number.replace(/\s+/g, ""))) {
        tempErrors.cardNumber = "Valid 16-digit Card Number is required";
      }
      if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiry)) {
        tempErrors.cardExpiry = "Expiry Date (MM/YY) is required";
      }
      if (!/^\d{3}$/.test(cardInfo.cvc)) {
        tempErrors.cardCvc = "Valid 3-digit CVC is required";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Order placed successfully! Chef is preheating the oven.");
      clearCart();
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } else {
      toast.error("Please fill in all shipping and payment fields.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
        <h2 className="text-xl font-black text-text-primary">No items to checkout</h2>
        <p className="text-xs text-text-muted mt-1 max-w-xs leading-normal">
          Add gourmet delicacies to your shopping bag before proceeding.
        </p>
        <Button onClick={() => navigate("/menu")} className="mt-6">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl">
      <h1 className="text-2xl md:text-4xl font-black text-text-primary mb-8 md:mb-12 tracking-tight">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Left Side: Shipping & Payment Forms */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Shipping Form */}
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-sm">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight pb-3 border-b border-border-light/80 mb-5">
              1. Delivery Destination
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary pl-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                {errors.name && <span className="text-2xs text-error font-medium px-2">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary pl-1">
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5th Avenue, Apt 4B"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                {errors.address && <span className="text-2xs text-error font-medium px-2">{errors.address}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary pl-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="e.g. New York"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                {errors.city && <span className="text-2xs text-error font-medium px-2">{errors.city}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-text-secondary pl-1">
                  Zip/Postal Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 10001"
                  value={shippingInfo.zip}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                  className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
                {errors.zip && <span className="text-2xs text-error font-medium px-2">{errors.zip}</span>}
              </div>
            </div>
          </Card>

          {/* Payment Forms */}
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-sm">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight pb-3 border-b border-border-light/80 mb-5">
              2. Payment Credentials
            </h3>

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`flex-grow flex items-center justify-center gap-2 p-3 border rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary-light/40 text-primary"
                    : "border-border text-text-secondary hover:bg-neutral-50"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`flex-grow flex items-center justify-center gap-2 p-3 border rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-primary bg-primary-light/40 text-primary"
                    : "border-border text-text-secondary hover:bg-neutral-50"
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-secondary pl-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="1234 5678 1234 5678"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                    className="w-full pl-4 pr-3 py-2.5 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                  {errors.cardNumber && <span className="text-2xs text-error font-medium px-2">{errors.cardNumber}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-secondary pl-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.cardExpiry && <span className="text-2xs text-error font-medium px-2">{errors.cardExpiry}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-secondary pl-1">
                      Security Code (CVC)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="123"
                      value={cardInfo.cvc}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                      className="w-full pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.cardCvc && <span className="text-2xs text-error font-medium px-2">{errors.cardCvc}</span>}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-primary-light/30 border border-primary/5 rounded-2xl text-xs text-text-secondary leading-normal">
                Pay with cash or card upon delivery. Our chef delivery ambassador will present a digital invoice terminal at your door.
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Order Review */}
        <div className="flex flex-col gap-6 w-full">
          <Card className="p-6 border border-border/30 bg-surface shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight pb-3 border-b border-border-light/80">
              Gourmet Order Review
            </h3>

            {/* Review Items */}
            <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs text-text-secondary">
                  <span className="truncate pr-4 flex-grow">
                    {item.title} <span className="text-primary font-bold">x {item.quantity}</span>
                  </span>
                  <span className="font-bold text-text-primary shrink-0">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-t border-border-light/80" />

            {/* Calculations summaries */}
            <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(priceBreakdown.subtotal)}</span>
              </div>
              {priceBreakdown.discountAmount > 0 && (
                <div className="flex justify-between text-success-hover font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(priceBreakdown.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {priceBreakdown.deliveryFee === 0 ? "Free" : formatPrice(priceBreakdown.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(priceBreakdown.tax)}</span>
              </div>
              <hr className="border-t border-border-light/80 my-1" />
              <div className="flex justify-between text-sm text-text-primary font-black">
                <span>Grand Total</span>
                <span className="text-primary">{formatPrice(priceBreakdown.grandTotal)}</span>
              </div>
            </div>

            {/* Final Order Trigger */}
            <Button onClick={handlePlaceOrder} className="w-full py-4 mt-2">
              Place Gourmet Order
            </Button>

            <span className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Secure checkout. Protected by SSL encryption.</span>
            </span>
          </Card>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
