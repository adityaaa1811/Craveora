import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { 
  ShieldCheck, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Truck, 
  User, 
  Phone, 
  Mail, 
  Home, 
  Locate, 
  Globe, 
  Bookmark, 
  BadgePercent, 
  ArrowRight,
  Sparkles,
  Wallet,
  Building,
  QrCode
} from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { selectCurrentUser } from "../store/slices/authSlice";
import { useCart } from "../features/cart/hooks/useCart";
import { Card, Input, Button } from "../components/ui";

const checkoutSchema = z.object({
  // Address section
  name: z.string().min(1, "Full name is required").min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number (e.g. +18005550199)"),
  email: z.string().min(1, "Email address is required").email("Please enter a valid email address"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{5,6}$/, "Postal code must be 5 or 6 digits"),
  country: z.string().min(1, "Country is required"),
  saveAddress: z.boolean().optional(),
  
  // Delivery & payment selections
  deliveryMethod: z.enum(["standard", "express", "pickup"]),
  paymentMethod: z.enum(["cod", "card", "upi", "netbanking", "wallet"]),
  
  // Conditionally validated fields
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  upiId: z.string().optional(),
}).superRefine((data, ctx) => {
  // Card conditional validation
  if (data.paymentMethod === "card") {
    const cleanNumber = (data.cardNumber || "").replace(/\s+/g, "");
    if (!cleanNumber || !/^\d{16}$/.test(cleanNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid 16-digit card number is required",
        path: ["cardNumber"],
      });
    }
    if (!data.cardExpiry || !/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expiry date (MM/YY) is required",
        path: ["cardExpiry"],
      });
    }
    const cleanCvc = (data.cardCvc || "").trim();
    if (!cleanCvc || !/^\d{3}$/.test(cleanCvc)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid 3-digit security code (CVC) is required",
        path: ["cardCvc"],
      });
    }
  } 
  // UPI conditional validation
  else if (data.paymentMethod === "upi") {
    const cleanUpi = (data.upiId || "").trim();
    if (!cleanUpi || !/^[\w.-]+@[\w.-]+$/.test(cleanUpi)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid UPI ID is required (e.g. username@bank)",
        path: ["upiId"],
      });
    }
  }
});

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  const { 
    cartItems, 
    priceBreakdown, 
    clearCart,
    couponCode,
    couponError,
    couponSuccess,
    applyCoupon,
    removeCoupon
  } = useCart();
  
  const [couponInput, setCouponInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup with default values
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: currentUser?.name || "Aditya Mishra",
      email: currentUser?.email || "aditya.mishra@craveora.com",
      phone: currentUser?.phone || "+18005550199",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      saveAddress: false,
      deliveryMethod: "standard",
      paymentMethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      upiId: ""
    },
  });

  const selectedDeliveryMethod = watch("deliveryMethod");
  const selectedPaymentMethod = watch("paymentMethod");

  // Dynamic calculations based on selected delivery method
  const dynamicPricing = useMemo(() => {
    const subtotal = priceBreakdown.subtotal;
    const discount = priceBreakdown.discountAmount;
    
    // Standard delivery is standard Redux fee ($5 or $0), Express is $10, Pickup is $0
    let deliveryFee = priceBreakdown.deliveryFee;
    if (selectedDeliveryMethod === "express") {
      deliveryFee = 10.00;
    } else if (selectedDeliveryMethod === "pickup") {
      deliveryFee = 0.00;
    }

    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.08 * 100) / 100;
    const grandTotal = Math.max(0, Math.round((subtotal - discount + tax + deliveryFee) * 100) / 100);

    return {
      subtotal,
      discount,
      deliveryFee,
      tax,
      grandTotal
    };
  }, [priceBreakdown, selectedDeliveryMethod]);

  // Delivery estimates mapping
  const deliveryEstimates = {
    standard: {
      time: "35-45 minutes",
      description: "Delivered in signature insulated thermal cases to preserve temperature."
    },
    express: {
      time: "20-30 minutes",
      description: "Priority logistics. Guided direct delivery from culinary studio to door."
    },
    pickup: {
      time: "15-20 minutes",
      description: "Collect from our Lounge Valet. Curated packaging and gift presentation."
    }
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    applyCoupon(couponInput);
  };

  const handleCouponRemove = () => {
    removeCoupon();
    setCouponInput("");
  };

  const onFormSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate luxury order creation API
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Order Placed Successfully! Chef has started preparing.");
      
      const orderNumber = `CRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Clear the cart on successful checkout
      clearCart();
      
      // Navigate to order success with details in router state
      navigate("/order-success", {
        state: {
          orderNumber,
          estimatedDelivery: deliveryEstimates[data.deliveryMethod].time,
          deliveryMethod: data.deliveryMethod,
          grandTotal: dynamicPricing.grandTotal,
          recipientName: data.name
        }
      });
    }, 2500);
  };

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-primary-light/50 flex items-center justify-center text-primary mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-text-primary tracking-tight">Your Gourmet Bag is Empty</h2>
        <p className="text-xs text-text-muted mt-2 max-w-xs leading-normal">
          Explore our signature catalog and select standard-defining delicacies before proceeding.
        </p>
        <Button onClick={() => navigate("/menu")} className="mt-8 px-8 py-3.5 text-xs tracking-wider">
          BROWSE MENU
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl">
      <div className="mb-10 text-center md:text-left">
        <span className="text-2xs font-extrabold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full select-none">
          Checkout Concierge
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary mt-4 tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-2">
          Verify your delivery coordinates and select preferred culinary handover specifications.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Left Side: Address, Method, Payment */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* 1. Delivery Coordinates */}
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-md">
            <div className="flex items-center gap-3 border-b border-border-light pb-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-text-primary tracking-tight">
                1. Delivery Coordinates
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                placeholder="e.g. John Doe"
                prefix={<User className="w-4 h-4 text-text-muted" />}
                error={errors.name?.message}
                disabled={isSubmitting}
                autocomplete="name"
                {...register("name")}
              />

              <Input
                label="Phone Number"
                placeholder="e.g. +18005550199"
                prefix={<Phone className="w-4 h-4 text-text-muted" />}
                error={errors.phone?.message}
                disabled={isSubmitting}
                autocomplete="tel"
                {...register("phone")}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Street Address"
                  placeholder="e.g. 5th Avenue, Apt 4B"
                  prefix={<Home className="w-4 h-4 text-text-muted" />}
                  error={errors.street?.message}
                  disabled={isSubmitting}
                  autocomplete="street-address"
                  {...register("street")}
                />
              </div>

              <Input
                label="City"
                placeholder="e.g. New York"
                prefix={<Locate className="w-4 h-4 text-text-muted" />}
                error={errors.city?.message}
                disabled={isSubmitting}
                autocomplete="address-level2"
                {...register("city")}
              />

              <Input
                label="State / Province"
                placeholder="e.g. NY"
                prefix={<Locate className="w-4 h-4 text-text-muted" />}
                error={errors.state?.message}
                disabled={isSubmitting}
                autocomplete="address-level1"
                {...register("state")}
              />

              <Input
                label="Postal / Zip Code"
                placeholder="e.g. 10001"
                prefix={<Bookmark className="w-4 h-4 text-text-muted" />}
                error={errors.postalCode?.message}
                disabled={isSubmitting}
                autocomplete="postal-code"
                {...register("postalCode")}
              />

              <Input
                label="Country"
                placeholder="e.g. United States"
                prefix={<Globe className="w-4 h-4 text-text-muted" />}
                error={errors.country?.message}
                disabled={isSubmitting}
                autocomplete="country-name"
                {...register("country")}
              />

              <div className="sm:col-span-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. john@example.com"
                  prefix={<Mail className="w-4 h-4 text-text-muted" />}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  autocomplete="email"
                  {...register("email")}
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2.5 mt-2">
                <input
                  type="checkbox"
                  id="saveAddress"
                  className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary/20 accent-primary cursor-pointer"
                  disabled={isSubmitting}
                  {...register("saveAddress")}
                />
                <label 
                  htmlFor="saveAddress" 
                  className="text-xs font-semibold text-text-secondary select-none cursor-pointer"
                >
                  Save this address to my profile
                </label>
              </div>
            </div>
          </Card>

          {/* 2. Handover Method */}
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-md">
            <div className="flex items-center gap-3 border-b border-border-light pb-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
                <Truck className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-text-primary tracking-tight">
                2. Handover Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Standard */}
              <label 
                className={`border rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none transition-all focus-within:ring-4 focus-within:ring-primary/10 ${
                  selectedDeliveryMethod === "standard"
                    ? "border-primary bg-primary-light/30 shadow-inner"
                    : "border-border hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-text-primary">Standard Delivery</span>
                    <span className="text-[10px] text-text-muted font-bold mt-1">Insulated Transit</span>
                  </div>
                  <input 
                    type="radio" 
                    value="standard" 
                    className="accent-primary w-4 h-4 cursor-pointer"
                    disabled={isSubmitting}
                    {...register("deliveryMethod")} 
                  />
                </div>
                <span className="text-xs font-extrabold text-primary mt-6 block">
                  {priceBreakdown.deliveryFee === 0 ? "Free" : formatPrice(priceBreakdown.deliveryFee)}
                </span>
              </label>

              {/* Express */}
              <label 
                className={`border rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none transition-all focus-within:ring-4 focus-within:ring-primary/10 ${
                  selectedDeliveryMethod === "express"
                    ? "border-primary bg-primary-light/30 shadow-inner"
                    : "border-border hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-text-primary">Express Delivery</span>
                    <span className="text-[10px] text-text-muted font-bold mt-1">Priority Courier</span>
                  </div>
                  <input 
                    type="radio" 
                    value="express" 
                    className="accent-primary w-4 h-4 cursor-pointer"
                    disabled={isSubmitting}
                    {...register("deliveryMethod")} 
                  />
                </div>
                <span className="text-xs font-extrabold text-primary mt-6 block">
                  $10.00
                </span>
              </label>

              {/* Pickup */}
              <label 
                className={`border rounded-2xl p-5 flex flex-col justify-between cursor-pointer select-none transition-all focus-within:ring-4 focus-within:ring-primary/10 ${
                  selectedDeliveryMethod === "pickup"
                    ? "border-primary bg-primary-light/30 shadow-inner"
                    : "border-border hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-text-primary">Lounge Pickup</span>
                    <span className="text-[10px] text-text-muted font-bold mt-1">Valet Presentation</span>
                  </div>
                  <input 
                    type="radio" 
                    value="pickup" 
                    className="accent-primary w-4 h-4 cursor-pointer"
                    disabled={isSubmitting}
                    {...register("deliveryMethod")} 
                  />
                </div>
                <span className="text-xs font-extrabold text-primary mt-6 block">
                  Free
                </span>
              </label>
            </div>

            {/* Dynamic Estimate Notice */}
            <div className="mt-6 p-4 bg-primary-light/20 border border-primary/5 rounded-2xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-text-primary block">
                  Estimated Handover: {deliveryEstimates[selectedDeliveryMethod].time}
                </span>
                <p className="text-[11px] text-text-secondary leading-normal mt-1">
                  {deliveryEstimates[selectedDeliveryMethod].description}
                </p>
              </div>
            </div>
          </Card>

          {/* 3. Payment Protocol */}
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-md">
            <div className="flex items-center gap-3 border-b border-border-light pb-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-primary">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="text-base font-extrabold text-text-primary tracking-tight">
                3. Settlement Selection
              </h2>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "upi", label: "UPI", icon: QrCode },
                { id: "cod", label: "Cash", icon: Wallet },
                { id: "netbanking", label: "Banking", icon: Building },
                { id: "wallet", label: "Wallet", icon: Wallet }
              ].map((pm) => {
                const isActive = selectedPaymentMethod === pm.id;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setValue("paymentMethod", pm.id)}
                    disabled={isSubmitting}
                    className={`flex flex-col items-center justify-center gap-2 p-3.5 border rounded-2xl text-[10px] font-extrabold transition-all cursor-pointer ${
                      isActive
                        ? "border-primary bg-primary-light/40 text-primary shadow-inner"
                        : "border-border text-text-secondary hover:bg-neutral-50"
                    }`}
                  >
                    <pm.icon className="w-4 h-4" />
                    <span>{pm.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional input sections */}
            <AnimatePresence mode="wait">
              {selectedPaymentMethod === "card" && (
                <motion.div
                  key="card-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-4"
                >
                  <Input
                    label="Card Number"
                    placeholder="e.g. 1234 5678 1234 5678"
                    maxLength={16}
                    error={errors.cardNumber?.message}
                    disabled={isSubmitting}
                    {...register("cardNumber")}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      maxLength={5}
                      error={errors.cardExpiry?.message}
                      disabled={isSubmitting}
                      {...register("cardExpiry")}
                    />
                    <Input
                      label="Security Code (CVC)"
                      placeholder="123"
                      maxLength={3}
                      error={errors.cardCvc?.message}
                      disabled={isSubmitting}
                      {...register("cardCvc")}
                    />
                  </div>
                </motion.div>
              )}

              {selectedPaymentMethod === "upi" && (
                <motion.div
                  key="upi-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <Input
                    label="UPI Virtual Payment Address"
                    placeholder="e.g. username@bank"
                    error={errors.upiId?.message}
                    disabled={isSubmitting}
                    {...register("upiId")}
                  />
                </motion.div>
              )}

              {selectedPaymentMethod === "cod" && (
                <motion.div
                  key="cod-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 bg-primary-light/30 border border-primary/5 rounded-2xl text-xs text-text-secondary leading-normal"
                >
                  Pay via Cash or Card terminal upon delivery. A digital valet will deliver a receipt link to your phone immediately.
                </motion.div>
              )}

              {(selectedPaymentMethod === "netbanking" || selectedPaymentMethod === "wallet") && (
                <motion.div
                  key="redirection-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 bg-primary-light/30 border border-primary/5 rounded-2xl text-xs text-text-secondary leading-normal"
                >
                  You will be securely redirected to your provider portal to authenticate the transaction after checking out.
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>

        {/* Right Side: Order Review & Action */}
        <div className="flex flex-col gap-6 w-full">
          
          {/* Order Summary Card */}
          <Card className="p-6 border border-border/30 bg-surface shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-text-primary tracking-tight pb-3 border-b border-border-light/80">
              Connoisseur Review
            </h3>

            {/* List items */}
            <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 justify-between items-center text-xs text-text-secondary">
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-10 h-10 rounded-lg object-cover bg-neutral-100 border border-border-light shrink-0" 
                    />
                    <span className="truncate font-medium">
                      {item.title} <span className="text-primary font-bold">x {item.quantity}</span>
                    </span>
                  </div>
                  <span className="font-bold text-text-primary shrink-0">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-t border-border-light" />

            {/* Calculations breakdown */}
            <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-text-primary">{formatPrice(dynamicPricing.subtotal)}</span>
              </div>
              
              {dynamicPricing.discount > 0 && (
                <div className="flex justify-between text-success-hover font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(dynamicPricing.discount)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-bold text-text-primary">
                  {dynamicPricing.deliveryFee === 0 ? "Complimentary" : formatPrice(dynamicPricing.deliveryFee)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Taxes & Duties (8%)</span>
                <span className="font-bold text-text-primary">{formatPrice(dynamicPricing.tax)}</span>
              </div>
              
              <hr className="border-t border-border-light my-1" />
              
              <div className="flex justify-between text-sm text-text-primary font-black">
                <span>Grand Total</span>
                <span className="text-primary font-bold">{formatPrice(dynamicPricing.grandTotal)}</span>
              </div>
            </div>

            {/* Submit checkout CTA */}
            <Button 
              type="submit" 
              isLoading={isSubmitting} 
              className="w-full py-4 mt-2 text-xs tracking-wider"
            >
              <span>PLACE GOURMET ORDER</span>
              {!isSubmitting && <ArrowRight className="w-4 h-4" />}
            </Button>

            <span className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted mt-2 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-success" />
              <span>Gourmet checkout protected by SSL.</span>
            </span>
          </Card>

          {/* Coupon Code Panel */}
          <Card className="p-5 border border-border/30 bg-surface shadow-sm">
            <h4 className="text-xs font-black text-text-primary uppercase tracking-wider mb-3">
              Elite Invitation Coupons
            </h4>
            
            {!couponCode ? (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code (e.g. CRAVE20)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-grow pl-4 pr-3 py-2 text-xs border border-border rounded-full bg-surface text-text-primary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder-text-muted"
                />
                <Button 
                  type="submit" 
                  variant="outline" 
                  size="sm" 
                  disabled={isSubmitting}
                  className="px-4"
                >
                  Apply
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-3.5 bg-success-light border border-success/10 rounded-2xl text-xs">
                <div className="flex items-center gap-2">
                  <BadgePercent className="w-4 h-4 text-success" />
                  <div>
                    <span className="font-extrabold text-success uppercase block leading-none">{couponCode}</span>
                    <span className="text-[10px] text-text-secondary mt-1 block font-medium">{couponSuccess}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCouponRemove}
                  className="text-2xs font-extrabold text-error hover:text-error-hover uppercase tracking-wider cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {couponError && (
              <span className="text-xs text-error font-semibold block mt-2 px-2">
                {couponError}
              </span>
            )}
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
