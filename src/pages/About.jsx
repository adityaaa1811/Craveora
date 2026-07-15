import React from "react";
import { Award, Compass, Heart, Shield } from "lucide-react";
import { Card } from "../components/ui";

export const About = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-7xl">
      {/* Narrative Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-2xs font-extrabold text-primary uppercase tracking-widest bg-primary-light/50 px-4 py-1.5 rounded-full">
          Our Brand Story
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary mt-6 tracking-tight">
          Refining Culinary Luxury
        </h1>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed mt-4">
          Established in 2026, Craveora is dedicated to connecting premium, Michelin-starred kitchens with food connoisseurs, elevating home dining to an absolute art form.
        </p>
      </div>

      {/* Two Column details split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop"
            alt="Elite kitchen dining"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
            Crafted by Master Chefs, Delivered for Connoisseurs
          </h2>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
            We believe that fine dining is more than just ingredients; it is an experience of presentation, sensory satisfaction, and absolute passion. Every recipe featured on our platform is exclusively curated, tested, and approved by culinary masterminds.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-dark border border-border/30 rounded-2xl">
              <span className="text-xl font-black text-primary block">100%</span>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wide">
                Organic Sourcing
              </span>
            </div>
            <div className="p-4 bg-surface-dark border border-border/30 rounded-2xl">
              <span className="text-xl font-black text-primary block">30+</span>
              <span className="text-[10px] text-text-muted font-bold uppercase tracking-wide">
                Michelin Chefs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Core values cards */}
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xl font-black text-text-primary tracking-tight">
            Our Core Values
          </h3>
          <p className="text-xs text-text-muted mt-2">
            The guiding principles behind every culinary service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: Award,
              title: "Michelin Quality",
              desc: "Uncompromising standards in every curated dish."
            },
            {
              icon: Shield,
              title: "Meticulous Care",
              desc: "Thermo-insulated logistics to protect flavors."
            },
            {
              icon: Compass,
              title: "Taste Discovery",
              desc: "Constantly expanding our culinary destinations."
            },
            {
              icon: Heart,
              title: "Gourmet Passion",
              desc: "Bridging the gap between art and gastronomy."
            }
          ].map((item, idx) => (
            <Card
              key={idx}
              className="p-6 border border-border/30 bg-surface shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col gap-4 text-center items-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-light/50 flex items-center justify-center text-primary">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-extrabold text-text-primary">
                {item.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
