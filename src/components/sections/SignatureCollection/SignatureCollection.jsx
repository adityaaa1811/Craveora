import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../../features/menu/data/products";
import ProductCard from "../../../features/menu/components/ProductCard";

/**
 * SignatureCollection Section
 * Represents a showcase structure for signature culinary items.
 * Reuses the existing ProductCard components and loads real menu items.
 */
export const SignatureCollection = () => {
  // Grab 3 signature items from our catalog (e.g. Wagyu Steak, Salmon, Chocolate Opera)
  const signatureItems = useMemo(() => {
    return products.slice(0, 3);
  }, []);

  return (
    <section id="signature-collection" className="w-full py-16 md:py-24 border-t border-border/30 bg-surface select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="text-2xs uppercase tracking-widest font-extrabold block text-primary mb-2">
              Limited Edition Creations
            </span>
            <h2 className="text-3xl font-black tracking-tight text-text-primary">
              The Signature Collection
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-hover flex items-center gap-1.5 mt-4 sm:mt-0 group"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Real Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SignatureCollection;
