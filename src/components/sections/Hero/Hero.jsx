import React from "react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

/**
 * Hero Section
 * Coordinating component that displays the application shell's homepage hero.
 */
const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 flex items-center min-h-[calc(100vh-80px)] select-none bg-surface"
    >
      {/* Ambient background glows */}
      <HeroBackground />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="order-2 lg:order-1 flex justify-start">
            <HeroContent />
          </div>

          {/* Right Column: Premium Dish visual */}
          <div className="order-1 lg:order-2 flex justify-center">
            <HeroImage />
          </div>
        </div>
      </div>

      {/* Luxury Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] text-text-muted font-bold uppercase tracking-widest pointer-events-none select-none">
        <span>Scroll</span>
        <div className="w-1.5 h-6 bg-primary-light/40 border border-primary/5 rounded-full relative overflow-hidden flex justify-center">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full absolute top-1"
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.4, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
