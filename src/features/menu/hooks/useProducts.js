import { useState, useEffect, useMemo } from "react";
import { categories } from "../data/categories";
import { products as initialProducts } from "../data/products";

export const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Micro-loading simulation for premium transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Derived filtered products memoized for performance
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Category Filter
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      // 2. Search Query Filter (Checks title and description)
      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !cleanQuery ||
        product.title.toLowerCase().includes(cleanQuery) ||
        product.description.toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return {
    products: filteredProducts,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isLoading
  };
};
