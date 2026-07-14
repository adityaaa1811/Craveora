import React from "react";

/**
 * WhyCraveora Section
 * Details the brand USPs (Unique Selling Propositions) including ingredients, chefs, and delivery.
 */
const WhyCraveora = () => {
  const values = [
    {
      title: "Artisanal Sourcing",
      description: "Direct partnerships with organic farms and micro-growers ensuring zero pesticide usage and maximum flavor extraction.",
    },
    {
      title: "Gastronomic Masterclass",
      description: "Dishes developed by Michelin-experienced culinary directors who blend classical techniques with progressive concepts.",
    },
    {
      title: "White-Glove Delivery",
      description: "Our logistics team uses specialized temperature-controlled cases, delivering meals in pristine restaurant plating configurations.",
    },
  ];

  return (
    <section id="why-craveora" className="w-full py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500 mb-2">
            The Craveora Standard
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Redefining Gourmet Convenience
          </h2>
        </div>

        {/* Values Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="space-y-4">
              {/* Numeric indicator to reinforce structure */}
              <span className="text-2xl font-semibold text-gray-300 block">
                0{index + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCraveora;
