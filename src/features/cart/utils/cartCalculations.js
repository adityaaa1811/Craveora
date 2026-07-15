/**
 * Calculates cart price summaries.
 * - Tax: 8% of the discounted subtotal.
 * - Delivery Fee: Flat $5.00, waived for orders over $50.00.
 */
export const calculateCart = (items = [], discountPercent = 0, freeDeliveryCoupon = false) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discountAmount = Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  
  const tax = Math.round(taxableAmount * 0.08 * 100) / 100;

  // Free delivery if order exceeds $50 or via special coupon
  const deliveryFee = subtotal > 50 || subtotal === 0 || freeDeliveryCoupon ? 0 : 5.00;

  const grandTotal = Math.max(0, Math.round((subtotal - discountAmount + tax + deliveryFee) * 100) / 100);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount,
    tax,
    deliveryFee,
    grandTotal
  };
};
export default calculateCart;
