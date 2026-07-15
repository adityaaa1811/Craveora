import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useCart } from "../hooks/useCart";
import CartList from "../components/CartList";
import CartSummary from "../components/CartSummary";
import CouponBox from "../components/CouponBox";
import DeliveryEstimator from "../components/DeliveryEstimator";
import EmptyCart from "../components/EmptyCart";
import SavedForLater from "../components/SavedForLater";
import SuggestedProducts from "../components/SuggestedProducts";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const CartPage = () => {
  const {
    cartItems,
    totalQuantity,
    wishlistItems,
    priceBreakdown,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    moveToWishlist,
    moveToCart,
    
    // Coupons
    couponCode,
    couponError,
    couponSuccess,
    discountPercent,
    applyCoupon,
    removeCoupon,

    // Estimations
    pincodeError,
    pincodeSuccess,
    deliveryEstimate,
    checkPincode,
    clearPincode
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleMoveToCart = (item) => {
    moveToCart(item);
    toast.success("Moved item to Cart.");
  };

  const handleRemoveSavedItem = (id) => {
    // Reuses wishlist toggle to remove from Saved for Later list
    moveToCart({ id }); // Simulates moving back, or just toggle
    toast.success("Removed item from Saved for Later list.");
  };

  const hasItems = cartItems.length > 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl"
    >
      {/* Header Title */}
      <motion.div variants={itemVariants} className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
          Gourmet Shopping Bag
        </h1>
        <p className="text-xs md:text-sm text-text-secondary mt-1">
          {hasItems
            ? `Review your selections. You have ${totalQuantity} delicacies reserved in your bag.`
            : "Review and manage your gourmet selections."}
        </p>
      </motion.div>

      {hasItems ? (
        /* Cart columns grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-start">
          {/* Items lists column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-4">
            <CartList
              items={cartItems}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={removeItem}
              onMoveToWishlist={moveToWishlist}
            />
          </motion.div>

          {/* Pricing calculations, Coupon input, Delivery estimators column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6 w-full">
            <CartSummary
              priceBreakdown={priceBreakdown}
              discountPercent={discountPercent}
              onCheckout={handleCheckout}
            />

            <CouponBox
              couponCode={couponCode}
              couponError={couponError}
              couponSuccess={couponSuccess}
              onApply={applyCoupon}
              onRemove={removeCoupon}
            />

            <DeliveryEstimator
              pincodeError={pincodeError}
              pincodeSuccess={pincodeSuccess}
              deliveryEstimate={deliveryEstimate}
              onCheck={checkPincode}
              onClear={clearPincode}
            />
          </motion.div>
        </div>
      ) : (
        /* Empty bag view state */
        <motion.div variants={itemVariants}>
          <EmptyCart />
        </motion.div>
      )}

      {/* Saved for later block */}
      <motion.div variants={itemVariants}>
        <SavedForLater
          items={wishlistItems}
          onMoveToCart={handleMoveToCart}
          onRemove={handleRemoveSavedItem}
        />
      </motion.div>

      {/* Cross-sell pairing recommendations */}
      <motion.div variants={itemVariants}>
        <SuggestedProducts cartItems={cartItems} />
      </motion.div>
    </motion.div>
  );
};

export default CartPage;
