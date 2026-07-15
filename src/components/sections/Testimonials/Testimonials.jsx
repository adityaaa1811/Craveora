import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Card, Avatar, Rating } from "../../ui";

/**
 * Testimonials Section
 * Displays luxury client feedback and critiques from gastronomy critics inside an animated Carousel.
 */
export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "Craveora has fundamentally changed our private entertaining. The level of complexity in the dishes and the impeccable packaging standard rival top-tier dining establishments globally.",
      author: "Victoria Sterling",
      identity: "Gourmand & Art Patron",
      rating: 5
    },
    {
      quote: "The Lobster Thermidor was sublime. Every component arrived at the perfect temperature and texture. A true culinary masterclass delivered straight to the study room.",
      author: "Marcus Vance",
      identity: "Editor, The Gastronomist",
      rating: 5
    },
    {
      quote: "An absolute culinary revelation. Sourcing and curation are exceptionally rare and clear. This is the luxury gastronomic standard that modern dining requires.",
      author: "Clarissa Hayes",
      identity: "Culinary Critic & Sommelier",
      rating: 5
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface-dark">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary mb-2">
            Praise & Accolades
          </span>
          <h2 className="text-3xl font-black tracking-tight text-text-primary">
            Endorsed by Connoisseurs
          </h2>
        </div>

        {/* Carousel slide container */}
        <div className="relative flex items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl px-8"
            >
              <Card className="border border-border/30 p-8 flex flex-col items-center gap-6 bg-surface shadow-md rounded-3xl relative">
                <Quote className="absolute top-4 right-6 w-12 h-12 text-primary-light/40 -z-10" />
                <Rating rating={reviews[activeIndex].rating} />
                
                <p className="text-sm md:text-base text-text-secondary italic leading-relaxed max-w-xl">
                  "{reviews[activeIndex].quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border-light/60 w-full justify-center">
                  <Avatar name={reviews[activeIndex].author} size="sm" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-text-primary">
                      {reviews[activeIndex].author}
                    </h4>
                    <p className="text-[10px] text-text-muted font-semibold mt-0.5">
                      {reviews[activeIndex].identity}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2.5 rounded-full bg-surface border border-border/40 text-text-secondary hover:text-primary hover:shadow transition-all cursor-pointer focus:outline-none"
            aria-label="Previous testimonial slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 p-2.5 rounded-full bg-surface border border-border/40 text-text-secondary hover:text-primary hover:shadow transition-all cursor-pointer focus:outline-none"
            aria-label="Next testimonial slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? "bg-primary w-4" : "bg-neutral-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
