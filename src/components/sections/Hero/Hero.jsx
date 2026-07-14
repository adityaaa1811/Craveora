import React from "react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

/**
 * Hero Section
 * Coordinating component that displays the application shell's homepage hero.
 * Employs responsive layouts spanning from mobile (320px) up to ultra-wide displays (1440px+).
 */
const Hero = () => {
  return (
    <section id="hero" className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32 flex items-center min-h-[calc(100vh-64px)]">
      {/* Dynamic Animated Ambient Background */}
      <HeroBackground />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography Content & Actions */}
          <div className="order-2 lg:order-1 flex justify-start">
            <HeroContent />
          </div>

          {/* Right Column: Premium Interactive Plating Visuals */}
          <div className="order-1 lg:order-2 flex justify-center">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
