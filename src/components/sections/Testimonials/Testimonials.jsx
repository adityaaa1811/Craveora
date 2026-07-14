import React from "react";

/**
 * Testimonials Section
 * Displays luxury client feedback and critiques from gastronomy critics.
 */
const Testimonials = () => {
  const reviews = [
    {
      quote: "Craveora has fundamentally changed our private entertaining. The level of complexity in the dishes and the impeccable packaging standard rival top-tier dining establishments globally.",
      author: "Victoria Sterling",
      identity: "Gourmand & Art Patron",
    },
    {
      quote: "The Lobster Thermidor was sublime. Every component arrived at the perfect temperature and texture. A true culinary masterclass delivered straight to the study room.",
      author: "Marcus Vance",
      identity: "Editor, The Gastronomist",
    },
    {
      quote: "An absolute culinary revelation. Sourcing and curation are exceptionally rare and clear. This is the luxury gastronomic standard that modern dining requires.",
      author: "Clarissa Hayes",
      identity: "Culinary Critic & Sommelier",
    },
  ];

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 border-t border-gray-100 bg-gray-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500 mb-2">
            Praise & Accolades
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Endorsed by Connoisseurs
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 p-6 bg-white flex flex-col justify-between"
            >
              <p className="text-sm text-gray-600 italic leading-relaxed mb-6">
                "{review.quote}"
              </p>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                <p className="text-xs text-gray-400">{review.identity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
