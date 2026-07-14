import React from "react";
import { motion } from "framer-motion";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";

// Parent container variants orchestrating children stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Child variants for clean, staggered fade-in + slide-up entries
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * HeroContent Component
 * Renders the brand typography, badge, descriptions, and CTAs on the left side of the Hero.
 */
const HeroContent = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col space-y-6 md:space-y-8 max-w-xl text-left"
    >
      {/* Small Badge */}
      <motion.div variants={childVariants}>
        <HeroBadge />
      </motion.div>

      {/* Multi-line Bold Headline */}
      <motion.h1
        variants={childVariants}
        className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-text-primary uppercase"
      >
        Crafted
        <br />
        to
        <br />
        Crave<span className="text-primary">.</span>
      </motion.h1>

      {/* Structured Description */}
      <motion.div
        variants={childVariants}
        className="text-base sm:text-lg text-text-secondary font-medium space-y-1 border-l-2 border-primary/20 pl-4"
      >
        <p>Fresh ingredients.</p>
        <p>Chef-crafted recipes.</p>
        <p>Premium dining, delivered beautifully.</p>
      </motion.div>

      {/* CTA Actions */}
      <motion.div variants={childVariants} className="w-full">
        <HeroButtons />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
