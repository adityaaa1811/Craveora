import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, RotateCcw, Clock, Star } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
import { Card, Button } from "../../../components/ui";

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
    cuisine,
    setCuisine,
    vegType,
    setVegType,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    maxPrepTime,
    setMaxPrepTime,
    sortBy,
    setSortBy,
    isLoading,
    resetFilters
  } = useProducts();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const cuisinesList = ["Italian", "French", "Japanese", "American", "Modern"];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="container mx-auto px-4 md:px-8 py-10 md:py-16 max-w-7xl select-none"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <span className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase bg-primary-light px-4 py-1.5 rounded-full">
          Craveora Culinary
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-3 mb-4 leading-tight">
          Gourmet Menu Discovery
        </h1>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
          Savor the exceptional. Indulge in our curated selection of luxury culinary masterpieces, prepared with absolute precision by world-class chefs.
        </p>
      </motion.div>

      {/* Search & Filter Controls Group */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-8">
        
        {/* Search bar & toggle filter button */}
        <div className="flex w-full max-w-xl items-center gap-3">
          <div className="flex-grow">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <Button
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            variant={isFiltersOpen ? "primary" : "outline"}
            className="h-11 px-4.5 rounded-full shrink-0 gap-1.5 text-2xs font-extrabold tracking-wider"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>FILTERS</span>
          </Button>
        </div>

        {/* Categories slider */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Collapsible Advanced Filters Panel */}
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden w-full max-w-4xl"
            >
              <Card className="p-6 md:p-8 mt-2 border border-border/30 bg-surface shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
                
                {/* Column 1: Cuisines & Veg status */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
                      Cuisine Style
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setCuisine("all")}
                        className={`px-3 py-1.5 rounded-full text-2xs font-semibold border transition-all cursor-pointer ${
                          cuisine === "all"
                            ? "bg-primary-light border-primary/20 text-primary"
                            : "bg-surface border-border/60 text-text-secondary hover:text-primary"
                        }`}
                      >
                        All
                      </button>
                      {cuisinesList.map((c) => (
                        <button
                          key={c}
                          onClick={() => setCuisine(c)}
                          className={`px-3 py-1.5 rounded-full text-2xs font-semibold border transition-all cursor-pointer ${
                            cuisine === c
                              ? "bg-primary-light border-primary/20 text-primary"
                              : "bg-surface border-border/60 text-text-secondary hover:text-primary"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
                      Dietary Preferences
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "all", label: "All" },
                        { id: "veg", label: "Veg" },
                        { id: "non-veg", label: "Non-Veg" }
                      ].map((diet) => (
                        <button
                          key={diet.id}
                          onClick={() => setVegType(diet.id)}
                          className={`py-2 px-3 border rounded-xl text-2xs font-bold text-center transition-all cursor-pointer ${
                            vegType === diet.id
                              ? "border-primary bg-primary-light/40 text-primary shadow-inner"
                              : "border-border text-text-secondary hover:bg-neutral-50"
                          }`}
                        >
                          {diet.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Price range & Ratings */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center pl-1">
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                        Price Bracket
                      </span>
                      <span className="text-2xs font-black text-primary font-mono">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
                      Minimum Quality Rating
                    </span>
                    <div className="flex gap-2">
                      {[0, 4.5, 4.8].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating)}
                          className={`flex-1 py-2 px-2.5 border rounded-xl text-2xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            minRating === rating
                              ? "border-primary bg-primary-light/40 text-primary shadow-inner"
                              : "border-border text-text-secondary hover:bg-neutral-50"
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${minRating === rating ? "fill-current text-primary" : "text-text-muted"}`} />
                          <span>{rating === 0 ? "Any" : `${rating}+`}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 3: Prep Time & Sorting */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
                      Max Preparation Time
                    </span>
                    <div className="flex gap-2">
                      {[15, 30, 60].map((time) => (
                        <button
                          key={time}
                          onClick={() => setMaxPrepTime(time)}
                          className={`flex-1 py-2 px-2 border rounded-xl text-2xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                            maxPrepTime === time
                              ? "border-primary bg-primary-light/40 text-primary shadow-inner"
                              : "border-border text-text-secondary hover:bg-neutral-50"
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-text-muted" />
                          <span>{time === 60 ? "Any" : `<${time}m`}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider pl-1">
                      Sort Sequence
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3.5 py-2 text-2xs font-extrabold border border-border rounded-xl bg-surface text-text-primary focus:outline-none focus:border-primary cursor-pointer"
                    >
                      <option value="popularity">Popularity Ranking</option>
                      <option value="newest">New Releases</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>

                {/* Reset filters action */}
                <div className="md:col-span-3 border-t border-border-light/80 pt-4 flex justify-between items-center text-2xs font-extrabold select-none">
                  <span className="text-text-muted">
                    Displaying {products.length} delicacies
                  </span>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex items-center gap-1.5 text-primary hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>

              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
          <EmptyState onReset={resetFilters} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Menu;
