import React from "react";

/**
 * FeaturedCategories Section
 * Showcases the key categories of food offerings with structured navigation cards.
 */
const FeaturedCategories = () => {
  const categories = [
    {
      title: "Artisanal Patisserie",
      description: "Hand-rolled croissants, fresh sourdoughs, and delicate morning pastries.",
      link: "/menu?category=bakery",
    },
    {
      title: "Signature Entrées",
      description: "Sophisticated main courses curated with slow-cooked meats and aromatic herbs.",
      link: "/menu?category=entrees",
    },
    {
      title: "Luxury Desserts",
      description: "Exquisite truffles, gold-leaf mousses, and chef-crafted sweets.",
      link: "/menu?category=desserts",
    },
    {
      title: "Handcrafted Elixirs",
      description: "Pressed juices, specialty cold brews, and seasonal infused botanicals.",
      link: "/menu?category=beverages",
    },
  ];

  return (
    <section id="featured-categories" className="w-full py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500 mb-2">
            Curated Collections
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Browse Our Culinary Pillars
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="border border-gray-200 p-6 flex flex-col justify-between h-48 bg-white"
            >
              <div>
                <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-3">{category.description}</p>
              </div>
              <a
                href={category.link}
                className="text-xs font-semibold uppercase tracking-wider text-black border-b border-black self-start mt-4"
              >
                View Category
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
