import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Check, ShoppingBag, Clock, Sparkles, Receipt, ChevronRight } from "lucide-react";
import { Button, Card } from "../components/ui";

export const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve details passed from Checkout page or fallback to defaults for direct navigation checks
  const {
    orderNumber = `CRV-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    estimatedDelivery = "35-45 minutes",
    grandTotal = 0.00,
    recipientName = "Valued Customer"
  } = location.state || {};

  useEffect(() => {
    // Show a welcoming celebratory toast
    toast.success("Bon Appétit! Order received.", {
      icon: "🎉",
      duration: 4000
    });
  }, []);

  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  };

  const handleViewOrders = () => {
    toast.success("Order history is currently in demonstration mode.");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-2xl flex flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-center"
      >
        {/* Animated Premium Checkmark Illustration */}
        <div className="relative flex justify-center mb-8">
          {/* Floating Sparkle 1 */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 90, 180]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute left-1/4 top-0 text-secondary"
          >
            <Sparkles className="w-5 h-5 fill-current" />
          </motion.div>

          {/* Floating Sparkle 2 */}
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6],
              rotate: [0, -90, -180]
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute right-1/4 bottom-0 text-primary"
          >
            <Sparkles className="w-4 h-4 fill-current" />
          </motion.div>

          {/* Core Circle Checkmark */}
          <motion.div 
            variants={circleVariants}
            className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white shadow-xl relative"
          >
            {/* Pulsing Outer Rings */}
            <motion.div 
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-primary"
            />
            <Check className="w-12 h-12 stroke-[3]" />
          </motion.div>
        </div>

        {/* Narrative Header */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-2xs font-extrabold text-primary uppercase tracking-widest bg-primary-light px-4 py-1.5 rounded-full select-none">
            Order Confirmed
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary mt-5 tracking-tight">
            Thank you, {recipientName}
          </h1>
          <p className="text-xs md:text-sm text-text-secondary mt-3 max-w-md mx-auto leading-relaxed">
            Your gastronomic selections have been accepted. Our executive kitchen brigade has commenced preparation.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div variants={itemVariants} className="w-full mb-8">
          <Card className="p-6 md:p-8 border border-border/30 bg-surface shadow-md flex flex-col gap-5 text-left">
            <div className="flex justify-between items-center border-b border-border-light pb-4">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wider">
                Order Identifier
              </span>
              <span className="text-sm font-black text-text-primary font-mono select-all">
                {orderNumber}
              </span>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 rounded-xl bg-primary-light text-primary shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider block">
                  Estimated Handover
                </span>
                <span className="text-sm font-extrabold text-text-primary mt-1 block">
                  {estimatedDelivery}
                </span>
                <p className="text-2xs text-text-secondary mt-1 leading-normal">
                  You will receive SMS notifications as your courier ascends to your coordinates.
                </p>
              </div>
            </div>

            {grandTotal > 0 && (
              <div className="flex gap-4 items-start pt-2 border-t border-border-light">
                <div className="p-2.5 rounded-xl bg-primary-light text-primary shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-text-muted font-bold uppercase tracking-wider block">
                    Amount Settled
                  </span>
                  <span className="text-sm font-extrabold text-text-primary mt-1 block">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Action CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <Button 
            onClick={() => navigate("/menu")} 
            className="flex-grow sm:flex-none px-8 py-4 text-xs tracking-wider"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>CONTINUE SHOPPING</span>
          </Button>

          <Button 
            onClick={handleViewOrders} 
            variant="outline"
            className="flex-grow sm:flex-none px-8 py-4 text-xs tracking-wider"
          >
            <span>VIEW ALL ORDERS</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
