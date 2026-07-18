import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { products as initialProducts } from "../data/products";

export const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const categoryParam = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  // Advanced filters local state
  const [cuisine, setCuisine] = useState("all");
  const [vegType, setVegType] = useState("all"); // 'all', 'veg', 'non-veg'
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrepTime, setMaxPrepTime] = useState(60);
  const [sortBy, setSortBy] = useState("popularity"); // 'popularity', 'newest', 'price-asc', 'price-desc', 'rating'

  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = categoryParam;
  const searchQuery = searchParam;

  const setSearchQuery = (query) => {
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete("search");
    } else {
      newParams.set("search", query);
    }
    setSearchParams(newParams);
  };

  const setActiveCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setCuisine("all");
    setVegType("all");
    setPriceRange([0, 100]);
    setMinRating(0);
    setMaxPrepTime(60);
    setSortBy("popularity");
  };

  // Micro-loading simulation for premium transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    activeCategory, 
    searchQuery, 
    cuisine, 
    vegType, 
    priceRange, 
    minRating, 
    maxPrepTime, 
    sortBy
  ]);

  // Derived filtered and sorted products memoized for performance
  const filteredProducts = useMemo(() => {
    let result = initialProducts.filter((product) => {
      // 1. Category Filter
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      // 2. Search Query Filter (Checks title and description)
      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !cleanQuery ||
        product.title.toLowerCase().includes(cleanQuery) ||
        product.description.toLowerCase().includes(cleanQuery);

      // 3. Cuisine Filter
      const matchesCuisine =
        cuisine === "all" || product.cuisine === cuisine;

      // 4. Veg status filter
      const matchesVeg =
        vegType === "all" ||
        (vegType === "veg" && product.isVeg) ||
        (vegType === "non-veg" && !product.isVeg);

      // 5. Price range filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // 6. Rating filter
      const matchesRating = product.rating >= minRating;

      // 7. Prep time filter
      const matchesPrep = product.prepTime <= maxPrepTime;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesCuisine &&
        matchesVeg &&
        matchesPrice &&
        matchesRating &&
        matchesPrep
      );
    });

    // 8. Sorting
    return [...result].sort((a, b) => {
      if (sortBy === "popularity") {
        return b.popularity - a.popularity;
      }
      if (sortBy === "newest") {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [
    activeCategory, 
    searchQuery, 
    cuisine, 
    vegType, 
    priceRange, 
    minRating, 
    maxPrepTime, 
    sortBy
  ]);

  // Derived counts for favorite categories
  const favoriteCategories = useMemo(() => {
    const counts = {};
    initialProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return {
    products: filteredProducts,
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
    favoriteCategories,
    resetFilters: handleResetFilters
  };
};

export default useProducts;
