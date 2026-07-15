import React from "react";
import { Button } from "../../ui";

/**
 * HeroButtons Component
 * Renders the primary and secondary call-to-actions for the Hero section.
 */
const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-start select-none">
      {/* Primary CTA button */}
      <Button to="/menu" size="lg" className="w-full sm:w-auto px-8 py-4">
        Explore Menu
      </Button>

      {/* Secondary CTA button */}
      <Button
        to="/about"
        variant="outline"
        size="lg"
        className="w-full sm:w-auto px-8 py-4 bg-surface/45 backdrop-blur-xs"
      >
        Our Story
      </Button>
    </div>
  );
};

export default HeroButtons;
