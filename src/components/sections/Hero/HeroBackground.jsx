import React from "react";
import { motion } from "framer-motion";

/**
 * HeroBackground Component
 * Renders the cream-colored base background with subtle animated blurred gradients
 * for a premium, artistic feel.
 */
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-background">
      {/* Decorative Blur Circle 1 (Primary brand accent) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl md:w-[500px] md:h-[500px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative Blur Circle 2 (Secondary rose accent) */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-secondary/10 blur-3xl md:w-[400px] md:h-[400px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HeroBackground;
