import React from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, placeholder = "Search our gourmet menu..." }) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="relative w-full max-w-lg mx-auto"
    >
      <label htmlFor="menu-search-input" className="sr-only">
        Search menu items
      </label>
      
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
        <Search className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Input Field */}
      <input
        id="menu-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 text-sm md:text-base border border-border rounded-full bg-surface text-text-primary placeholder-text-muted transition-all duration-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary transition-colors duration-200"
          aria-label="Clear search input"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
