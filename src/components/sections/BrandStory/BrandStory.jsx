import React from "react";

/**
 * BrandStory Section
 * Shares the narrative of Craveora, emphasizing culinary craftsmanship and ingredient quality.
 */
const BrandStory = () => {
  return (
    <section id="brand-story" className="w-full py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Narrative Column */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500">
              The Heritage of Craft
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Where Gastronomy Meets Artistry
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Craveora was born from a singular vision: to liberate fine dining from the confines of 
              traditional restaurants. We believe that exceptional culinary moments should be experienced 
              in your most comfortable settings.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Every creation starts with an obsession over sourcing. We partner exclusively with local farms 
              and sustainable fisheries to ensure every herb, cut of meat, and seafood selection is delivered 
              at the absolute peak of freshness.
            </p>
          </div>

          {/* Visual Placeholder Column (No fancy UI, just layout structure) */}
          <div className="bg-gray-50 border border-gray-200 aspect-video flex items-center justify-center p-8">
            <div className="text-center">
              <span className="text-sm font-semibold block mb-1">Kitchen Craftsmanship Visual</span>
              <span className="text-xs text-gray-400">Authentic image representing preparation, plating, and ingredients.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
