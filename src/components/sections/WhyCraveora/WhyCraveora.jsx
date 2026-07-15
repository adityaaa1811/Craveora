import React from "react";
import { Sprout, ChefHat, ShieldCheck } from "lucide-react";
import { Card } from "../../ui";

/**
 * WhyCraveora Section
 * Details the brand USPs (Unique Selling Propositions) including ingredients, chefs, and delivery.
 */
export const WhyCraveora = () => {
  const values = [
    {
      icon: Sprout,
      title: "Artisanal Sourcing",
      description: "Direct partnerships with organic farms and micro-growers ensuring zero pesticide usage and maximum flavor extraction."
    },
    {
      icon: ChefHat,
      title: "Gastronomic Masterclass",
      description: "Dishes developed by Michelin-experienced culinary directors who blend classical techniques with progressive concepts."
    },
    {
      icon: ShieldCheck,
      title: "White-Glove Delivery",
      description: "Our logistics team uses specialized temperature-controlled cases, delivering meals in pristine restaurant plating configurations."
    }
  ];

  return (
    <section id="why-craveora" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary mb-2">
            The Craveora Standard
          </span>
          <h2 className="text-3xl font-black tracking-tight text-text-primary">
            Redefining Gourmet Convenience
          </h2>
        </div>

        {/* Values Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card
                key={index}
                className="p-6 md:p-8 border border-border/30 bg-surface shadow-2xs hover:shadow-md transition-all flex flex-col gap-5 rounded-2xl group"
              >
                {/* Numeric indicator & Icon */}
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-light/50 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-base font-black text-neutral-300">
                    0{index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-text-primary">{value.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mt-2.5">
                    {value.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCraveora;
