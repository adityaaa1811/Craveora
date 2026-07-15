import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../ui";

/**
 * ChefRecommendation Section
 * Showcases a special curation selected by the Head Chef, highlighting a signature pairing.
 */
export const ChefRecommendation = () => {
  return (
    <section id="chef-recommendation" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Chef Image / Visual */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-md border border-border/40 bg-neutral-100 group">
            <motion.img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop"
              alt="Executive Chef Alessandro Vane"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Recommendation Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary">
              The Chef's Curated Selection
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary">
              Truffle-Infused Lobster Thermidor & Vintage Pairing
            </h2>
            
            {/* Chef Quote Block */}
            <blockquote className="relative border-l-4 border-primary pl-5 py-2 bg-surface/40 rounded-r-2xl pr-4">
              <Quote className="absolute top-2 right-4 w-10 h-10 text-primary-light/50 -z-10" />
              <p className="text-xs md:text-sm text-text-secondary italic leading-relaxed">
                "Gastronomy is the ultimate form of art, where every ingredient tells a story. This season, 
                I invite you to experience the juxtaposition of fresh lobster meat, earthy summer truffles, 
                and a velvet chardonnay sauce."
              </p>
              <cite className="text-[10px] uppercase tracking-wider font-extrabold text-primary mt-3 block not-italic">
                — Chef Alessandro Vane, Culinary Director
              </cite>
            </blockquote>

            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
              Designed as a full multi-sensory experience, this selection includes an curated guide for pre-heating, 
              plating, and a custom audio playlist created specifically to complement the flavor profiles of the dish.
            </p>

            {/* CTA to Order */}
            <div className="pt-2">
              <Button to="/menu" size="lg" className="px-8">
                Reserve Chef Selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChefRecommendation;
