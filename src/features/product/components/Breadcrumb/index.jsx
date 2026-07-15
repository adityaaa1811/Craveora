import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export const Breadcrumb = ({ productName }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs md:text-sm text-text-secondary select-none">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link to="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
        </li>
        <li className="flex items-center text-text-muted" aria-hidden="true">
          <ChevronRight className="w-3.5 h-3.5" />
        </li>
        <li>
          <Link to="/menu" className="hover:text-primary transition-colors font-medium">
            Menu
          </Link>
        </li>
        {productName && (
          <>
            <li className="flex items-center text-text-muted" aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="font-semibold text-primary truncate max-w-[150px] md:max-w-none" aria-current="page">
              {productName}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
