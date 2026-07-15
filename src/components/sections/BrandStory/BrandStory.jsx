import React from "react";
import { motion } from "framer-motion";

/**
 * BrandStory Section
 * Shares the narrative of Craveora, emphasizing culinary craftsmanship and ingredient quality.
 */
export const BrandStory = () => {
  return (
    <section id="brand-story" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Story Narrative Column */}
          <div className="space-y-6">
            <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary">
              The Heritage of Craft
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary">
              Where Gastronomy Meets Artistry
            </h2>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Craveora was born from a singular vision: to liberate fine dining from the confines of 
              traditional restaurants. We believe that exceptional culinary moments should be experienced 
              in your most comfortable settings.
            </p>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Every creation starts with an obsession over sourcing. We partner exclusively with local farms 
              and sustainable fisheries to ensure every herb, cut of meat, and seafood selection is delivered 
              at the absolute peak of freshness.
            </p>
          </div>

          {/* Visual Column */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-border/40 bg-neutral-100 group">
            <motion.img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
              alt="Kitchen Preparation"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStory;
