import React from "react";
import { Link } from "react-router-dom";

export const BrandLogo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5 group select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-1"
      aria-label="Craveora Gourmet Ordering Platform Homepage"
    >
      {/* SVG Icon Logo Shell */}
      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-black shadow-md transition-transform duration-300 group-hover:scale-105">
        <svg
          className="w-4 h-4 fill-current text-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chef Hat or gourmet crown shape vector representation */}
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3.3l5.3 3.3L12 11.9 6.7 8.6 12 5.3zm-6 5.5l5 3.1v6.2l-5-3.1v-6.2zm7 9.3v-6.2l5-3.1v6.2l-5 3.1z" />
        </svg>
      </div>

      {/* Spaced Elegant Typography logo text */}
      <span className="text-lg md:text-xl font-black text-primary tracking-[0.18em] uppercase transition-colors duration-300 group-hover:text-primary-hover">
        CRAVEORA
      </span>
    </Link>
  );
};

export default BrandLogo;
