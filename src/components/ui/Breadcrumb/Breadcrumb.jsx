import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { products } from "../../../features/menu/data/products";

const pathMap = {
  menu: { label: "Gourmet Menu", path: "/menu" },
  cart: { label: "Gourmet Bag", path: "/cart" },
  checkout: { label: "Secure Checkout", path: "/checkout" },
  about: { label: "Our Story", path: "/about" },
  contact: { label: "Concierge Contact", path: "/contact" },
  profile: { label: "My Account", path: "/profile" }
};

export const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter((x) => x);

  // Return null on homepage
  if (segments.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="py-4 text-xs md:text-sm text-text-secondary select-none"
    >
      <ol className="flex items-center gap-2 flex-wrap">
        {/* Home root */}
        <li>
          <Link
            to="/"
            className="hover:text-primary transition-colors flex items-center gap-1 font-bold"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          
          // Check if this segment is a product ID (e.g. p1, p2)
          const productMatch = products.find((p) => p.id === segment);
          
          let label = segment;
          let path = "/" + segments.slice(0, index + 1).join("/");

          if (productMatch) {
            label = productMatch.title;
          } else if (pathMap[segment]) {
            label = pathMap[segment].label;
            path = pathMap[segment].path;
          } else {
            // Capitalize fallback
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
          }

          return (
            <React.Fragment key={path}>
              <li className="flex items-center text-text-muted" aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                {isLast ? (
                  <span
                    className="font-black text-primary truncate max-w-[150px] md:max-w-xs block"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    to={path}
                    className="hover:text-primary transition-colors font-bold"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
