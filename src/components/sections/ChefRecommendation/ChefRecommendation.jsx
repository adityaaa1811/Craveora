import React from "react";

/**
 * ChefRecommendation Section
 * Showcases a special curation selected by the Head Chef, highlighting a signature pairing.
 */
const ChefRecommendation = () => {
  return (
    <section id="chef-recommendation" className="w-full py-16 md:py-24 border-t border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Chef Image / Visual Layout Placeholder */}
          <div className="lg:col-span-5 border border-gray-200 bg-white aspect-[4/5] flex items-center justify-center p-8 text-center">
            <div>
              <span className="text-sm font-semibold block mb-2">Executive Chef Portrait</span>
              <span className="text-xs text-gray-400">Placeholder representing preparation details or portrait.</span>
            </div>
          </div>

          {/* Recommendation Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500">
              The Chef's Curated Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Truffle-Infused Lobster Thermidor & Vintage Pairing
            </h2>
            
            {/* Chef Quote Block */}
            <blockquote className="border-l-4 border-black pl-4 py-1">
              <p className="text-sm md:text-base text-gray-700 italic">
                "Gastronomy is the ultimate form of art, where every ingredient tells a story. This season, 
                I invite you to experience the juxtaposition of fresh lobster meat, earthy summer truffles, 
                and a velvet chardonnay sauce."
              </p>
              <cite className="text-xs uppercase tracking-wider font-semibold text-gray-500 mt-2 block not-italic">
                — Chef Alessandro Vane, Culinary Director
              </cite>
            </blockquote>

            <p className="text-sm text-gray-600 leading-relaxed">
              Designed as a full multi-sensory experience, this selection includes an curated guide for pre-heating, 
              plating, and a custom audio playlist created specifically to complement the flavor profiles of the dish.
            </p>

            {/* CTA to Order */}
            <div className="pt-4">
              <a
                href="/menu"
                className="px-6 py-3 border border-black bg-black text-white hover:bg-white hover:text-black font-medium text-sm transition-colors text-center inline-block"
              >
                Reserve Chef Selection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefRecommendation;
