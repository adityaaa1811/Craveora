import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Copy, Check, Clock, Gift, ArrowRight } from "lucide-react";
import { Card, Button, Badge } from "../components/ui";

export const OffersPage = () => {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);

  // Carousel banners state
  const [activeSlide, setActiveSlide] = useState(0);
  const banners = [
    {
      id: 1,
      title: "Signature Chef Recommendation",
      desc: "Unlock 20% off Japanese Wagyu beef steaks using coupon CRAVE20 this week.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800",
      code: "CRAVE20"
    },
    {
      id: 2,
      title: "Complimentary Valet Handover",
      desc: "Get free express delivery on all starter and main items using coupon FREESHIP.",
      image: "https://images.unsplash.com/photo-1559742811-82410b510429?q=80&w=800",
      code: "FREESHIP"
    },
    {
      id: 3,
      title: "Gourmet Connoisseur Launch",
      desc: "Savor premium dining selections with 10% off any order using code CRAVE10.",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800",
      code: "CRAVE10"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleApply = (code) => {
    localStorage.setItem("craveora_applied_coupon", code);
    toast.success(`Coupon ${code} applied to your gourmet bag!`, {
      icon: "🎟️"
    });
    navigate("/cart");
  };

  const coupons = [
    {
      code: "CRAVE20",
      discount: "20% OFF",
      desc: "Save 20% on any premium Japanese Wagyu steaks.",
      expiry: "Expires in: 3 days",
      terms: "Valid on mains category. Minimum order $50."
    },
    {
      code: "CRAVE10",
      discount: "10% OFF",
      desc: "Flat 10% off on all starters, mains, and desserts.",
      expiry: "Expires in: 5 days",
      terms: "Valid on all catalog items. No minimum order limit."
    },
    {
      code: "FREESHIP",
      discount: "FREE DELIVERY",
      desc: "Get complimentary express delivery by our valets.",
      expiry: "Expires in: 1 day",
      terms: "Applies to all addresses. Overrides local delivery fees."
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl select-none flex flex-col gap-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto pl-1">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary-light px-4 py-1.5 rounded-full">
          Craveora Privileges
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-3 mb-4 leading-tight">
          Offers & Promotional Perks
        </h1>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
          Indulge in standard-defining culinary experiences with exclusive Connoisseur coupons, bundle benefits, and seasonal promotions.
        </p>
      </div>

      {/* 1. Offers Banner Carousel */}
      <div className="relative h-60 md:h-80 w-full overflow-hidden rounded-3xl border border-border/30 bg-surface shadow-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col md:flex-row items-stretch"
          >
            {/* Banner details */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center gap-3.5 z-10 bg-overlay-light md:bg-transparent">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Featured Privilege</span>
              </span>
              <h2 className="text-xl md:text-2xl font-black text-text-primary leading-tight">
                {banners[activeSlide].title}
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed max-w-md">
                {banners[activeSlide].desc}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <Button 
                  onClick={() => handleApply(banners[activeSlide].code)} 
                  size="sm" 
                  className="px-5 py-2 text-2xs tracking-wider"
                >
                  <span>CLAIM NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Banner image */}
            <div className="flex-1 relative overflow-hidden hidden md:block">
              <img 
                src={banners[activeSlide].image} 
                alt={banners[activeSlide].title} 
                className="w-full h-full object-cover" 
              />
              {/* Fade overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel slide controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeSlide === i ? "bg-primary w-6" : "bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. Coupons Cards Grid */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-black text-text-primary uppercase tracking-wider pl-1">
          Active Connoisseur Coupons
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <Card 
                key={coupon.code} 
                className="p-6 border border-border/30 bg-surface shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden"
              >
                {/* Visual dotted border dividers */}
                <div className="absolute top-0 right-1/4 bottom-0 w-[1px] border-l border-dashed border-border-light/80 hidden" />

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary">
                      <Ticket className="w-5 h-5" />
                    </div>
                    <Badge variant="success" className="h-5 text-[8px] tracking-widest font-extrabold uppercase">
                      {coupon.discount}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-1 mt-1">
                    {/* Dotted coupon code display */}
                    <div className="flex items-center justify-between bg-neutral-50 border border-dashed border-border px-3.5 py-2.5 rounded-xl font-mono text-xs font-black text-text-primary select-all">
                      <span>{coupon.code}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className="text-text-muted hover:text-primary transition-colors cursor-pointer"
                        title="Copy Code"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-text-primary leading-snug mt-3">
                      {coupon.desc}
                    </p>
                    <p className="text-[10px] text-text-secondary mt-1 font-medium leading-relaxed">
                      {coupon.terms}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-light/80 text-2xs font-extrabold">
                  <span className="flex items-center gap-1 text-text-muted font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{coupon.expiry}</span>
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => handleApply(coupon.code)}
                    className="flex items-center gap-1 text-primary hover:underline cursor-pointer"
                  >
                    <span>Apply Coupon</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default OffersPage;
