import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
  ...props
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate page numbers with ellipses
  const getPages = () => {
    const pages = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1.5 select-none ${className}`}
      {...props}
    >
      {/* Prev Button */}
      <motion.button
        whileTap={currentPage > 1 ? { scale: 0.95 } : undefined}
        type="button"
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border/40 hover:border-primary/20 text-text-secondary disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-border/40 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed"
        aria-label="Go to previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Pages list */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-text-muted text-sm font-semibold select-none"
              >
                &bull;&bull;&bull;
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <motion.button
              key={`page-${page}`}
              whileTap={!isActive ? { scale: 0.95 } : undefined}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Go to page ${page}`}
              className={`w-9 h-9 rounded-full text-xs font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-surface border border-border/40 hover:border-primary/20 text-text-secondary hover:text-primary"
              }`}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileTap={currentPage < totalPages ? { scale: 0.95 } : undefined}
        type="button"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-surface border border-border/40 hover:border-primary/20 text-text-secondary disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-border/40 focus-visible:outline-2 focus-visible:outline-primary cursor-pointer disabled:cursor-not-allowed"
        aria-label="Go to next page"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </nav>
  );
};

export default Pagination;
