import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { products as initialProducts } from "../data/products";

export const useProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const activeCategory = categoryParam;

  const setActiveCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

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
