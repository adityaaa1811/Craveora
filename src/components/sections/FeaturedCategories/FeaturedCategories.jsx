import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "../../ui";

/**
 * FeaturedCategories Section
 * Showcases the key categories of food offerings with structured navigation cards.
 */
export const FeaturedCategories = () => {
  const categories = [
    {
      title: "Artisanal Patisserie",
      description: "Hand-rolled croissants, fresh sourdoughs, and delicate morning pastries.",
      link: "/menu?category=starters",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Signature Entrées",
      description: "Sophisticated main courses curated with slow-cooked meats and aromatic herbs.",
      link: "/menu?category=mains",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Luxury Desserts",
      description: "Exquisite truffles, gold-leaf mousses, and chef-crafted sweets.",
      link: "/menu?category=desserts",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=300&auto=format&fit=crop"
    },
    {
      title: "Handcrafted Elixirs",
      description: "Pressed juices, specialty cold brews, and seasonal infused botanicals.",
      link: "/menu?category=beverages",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <section id="featured-categories" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary mb-2">
            Curated Collections
          </span>
          <h2 className="text-3xl font-black tracking-tight text-text-primary">
            Browse Our Culinary Pillars
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border border-border/30 p-5 flex flex-col justify-between h-64 bg-surface hover:shadow-md hover:-translate-y-1 transition-all group"
            >
              <div className="flex flex-col gap-3">
                {/* Visual Thumbnail */}
                <div className="w-full h-24 rounded-xl overflow-hidden bg-neutral-100 border border-border-light/60">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{category.title}</h3>
                  <p className="text-[11px] text-text-muted mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
              <Link
                to={category.link}
                className="text-2xs font-extrabold uppercase tracking-wider text-primary hover:text-primary-hover flex items-center gap-1.5 self-start mt-2"
              >
                <span>View Category</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
