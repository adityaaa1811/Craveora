import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addItem as addToCartAction,
  removeItem as removeFromCartAction,
  increaseQuantity as increaseQtyAction,
  decreaseQuantity as decreaseQtyAction,
  clearCart as clearCartAction,
  selectCartItems,
  selectCartTotalQuantity
} from "../../../store/slices/cartSlice";
import {
  toggleWishlist as toggleWishlistAction,
  selectWishlistItems
} from "../../../store/slices/wishlistSlice";
import { calculateCart } from "../utils/cartCalculations";
import { COUPON_CODES } from "../constants/couponCodes";

export const useCart = () => {
  const dispatch = useAppDispatch();

  // Redux selections
  const cartItems = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const wishlistItems = useAppSelector(selectWishlistItems);

  // Local coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [freeDeliveryCoupon, setFreeDeliveryCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Local pincode estimator states
  const [pincode, setPincode] = useState("");
  const [deliveryEstimate, setDeliveryEstimate] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [pincodeSuccess, setPincodeSuccess] = useState("");

  // Auto recalculate prices on cart or coupon changes
  const priceBreakdown = useMemo(() => {
    return calculateCart(cartItems, discountPercent, freeDeliveryCoupon);
  }, [cartItems, discountPercent, freeDeliveryCoupon]);

  // Cart operations wrappers
  const handleAddItem = (product) => dispatch(addToCartAction(product));
  const handleRemoveItem = (id) => dispatch(removeFromCartAction(id));
  const handleIncreaseQty = (id) => dispatch(increaseQtyAction(id));
  const handleDecreaseQty = (id) => dispatch(decreaseQtyAction(id));
  const handleClearCart = () => {
    dispatch(clearCartAction());
    handleRemoveCoupon();
  };

  // Move to wishlist (Saved for Later)
  const handleMoveToWishlist = (item) => {
    // 1. Add to wishlist
    dispatch(toggleWishlistAction(item));
    // 2. Remove from cart
    dispatch(removeFromCartAction(item.id));
  };

  // Move back to cart from wishlist
  const handleMoveToCart = (item) => {
    // 1. Add to cart
    dispatch(addToCartAction(item));
    // 2. Remove from wishlist
    dispatch(toggleWishlistAction(item));
  };

  // Coupon calculations
  const handleApplyCoupon = (code) => {
    setCouponError("");
    setCouponSuccess("");
    
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }

    const cleanCode = code.trim().toUpperCase();
    const match = COUPON_CODES[cleanCode];

    if (match) {
      setDiscountPercent(match.percent);
      setFreeDeliveryCoupon(match.freeDelivery);
      setCouponCode(cleanCode);
      setCouponSuccess(`Applied: ${match.description}`);
    } else {
      setCouponError("Invalid coupon code");
      setDiscountPercent(0);
      setFreeDeliveryCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountPercent(0);
    setFreeDeliveryCoupon(false);
    setCouponError("");
    setCouponSuccess("");
  };

  // Pincode lookups
  const handleCheckPincode = (zip) => {
    setPincodeError("");
    setPincodeSuccess("");
    setDeliveryEstimate("");

    if (!zip) {
      setPincodeError("Please enter a zip code");
      return;
    }

    const cleanZip = zip.trim();
    // Validate 5 or 6 digit codes
    const isValid = /^\d{5,6}$/.test(cleanZip);

    if (isValid) {
      setPincode(cleanZip);
      const isExpress = cleanZip.endsWith("0") || cleanZip.endsWith("5");
      const estimateText = isExpress
        ? "Express Delivery: Chef is preparing. Estimated delivery in 20-30 mins."
        : "Standard Delivery: Estimated delivery in 35-45 mins.";
      
      setDeliveryEstimate(estimateText);
      setPincodeSuccess("Pincode verified!");
    } else {
      setPincodeError("Invalid pincode. Please enter a 5 or 6 digit number.");
    }
  };

  const handleClearPincode = () => {
    setPincode("");
    setDeliveryEstimate("");
    setPincodeError("");
    setPincodeSuccess("");
  };

  return {
    cartItems,
    totalQuantity,
    wishlistItems,
    priceBreakdown,
    
    // Actions
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    increaseQuantity: handleIncreaseQty,
    decreaseQuantity: handleDecreaseQty,
    clearCart: handleClearCart,
    moveToWishlist: handleMoveToWishlist,
    moveToCart: handleMoveToCart,

    // Coupons
    couponCode,
    couponError,
    couponSuccess,
    discountPercent,
    applyCoupon: handleApplyCoupon,
    removeCoupon: handleRemoveCoupon,

    // Estimations
    pincode,
    pincodeError,
    pincodeSuccess,
    deliveryEstimate,
    checkPincode: handleCheckPincode,
    clearPincode: handleClearPincode
  };
};

export default useCart;
