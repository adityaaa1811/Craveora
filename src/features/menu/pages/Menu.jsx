import React from "react";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Menu = () => {
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isLoading
  } = useProducts();

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase bg-primary-light px-3 py-1 rounded-full">
          Craveora Culinary
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-3 mb-4 leading-tight">
          Gourmet Menu Discovery
        </h1>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Savor the exceptional. Indulge in our curated selection of luxury culinary masterpieces, prepared with absolute precision by world-class chefs.
        </p>
      </motion.div>

      {/* Search & Filter Controls Group */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-10 md:mb-12">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="relative min-h-[300px]">
        {isLoading ? (
          /* Premium Grid Skeletons */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-surface border border-border/40 rounded-2xl p-4 flex flex-col justify-between h-[360px] animate-pulse"
              >
                <div>
                  <div className="w-full aspect-4/3 bg-neutral-200 rounded-xl mb-4" />
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-neutral-200 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-neutral-200 rounded w-full mb-2" />
                  <div className="h-3 bg-neutral-200 rounded w-5/6" />
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-light">
                  <div className="h-5 bg-neutral-200 rounded w-1/4" />
                  <div className="h-8 w-8 bg-neutral-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState onReset={handleResetFilters} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Menu;
