import React from "react";

/**
 * SignatureCollection Section
 * Represents a showcase structure for signature culinary items.
 * Integrates structural layout grid placeholders instead of final product card components.
 */
const SignatureCollection = () => {
  return (
    <section id="signature-collection" className="w-full py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold block text-gray-500 mb-2">
              Limited Edition Creations
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              The Signature Collection
            </h2>
          </div>
          <a
            href="/menu"
            className="text-xs font-semibold uppercase tracking-wider text-black border-b border-black mt-4 md:mt-0"
          >
            Explore Complete Collection
          </a>
        </div>

        {/* Structural Card Grid Layout (Placeholders only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card Placeholder 1 */}
          <div className="border border-gray-200 p-4 bg-white flex flex-col justify-between aspect-[3/4]">
            <div className="bg-gray-50 border border-gray-100 aspect-square flex items-center justify-center text-center p-4 mb-4">
              <span className="text-xs text-gray-400">Signature Dish Image Placeholder</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase mb-1">Entrée</span>
              <h3 className="text-lg font-bold mb-1">Slow-Braised Wagyu Short Rib</h3>
              <p className="text-xs text-gray-500 mb-4">
                Cooked for 72 hours with red wine reduction and baby root vegetables.
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
              <span className="text-sm font-bold">$48.00</span>
              <span className="text-xs font-semibold uppercase text-gray-400">Product Card Placeholder</span>
            </div>
          </div>

          {/* Card Placeholder 2 */}
          <div className="border border-gray-200 p-4 bg-white flex flex-col justify-between aspect-[3/4]">
            <div className="bg-gray-50 border border-gray-100 aspect-square flex items-center justify-center text-center p-4 mb-4">
              <span className="text-xs text-gray-400">Signature Dish Image Placeholder</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase mb-1">Seafood</span>
              <h3 className="text-lg font-bold mb-1">Pan-Seared Chilean Sea Bass</h3>
              <p className="text-xs text-gray-500 mb-4">
                Served over saffron-infused risotto and wild fennel broth.
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
              <span className="text-sm font-bold">$42.00</span>
              <span className="text-xs font-semibold uppercase text-gray-400">Product Card Placeholder</span>
            </div>
          </div>

          {/* Card Placeholder 3 */}
          <div className="border border-gray-200 p-4 bg-white flex flex-col justify-between aspect-[3/4]">
            <div className="bg-gray-50 border border-gray-100 aspect-square flex items-center justify-center text-center p-4 mb-4">
              <span className="text-xs text-gray-400">Signature Dish Image Placeholder</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase mb-1">Dessert</span>
              <h3 className="text-lg font-bold mb-1">Craveora Gold-Leaf Opera Cake</h3>
              <p className="text-xs text-gray-500 mb-4">
                Layers of almond sponge, espresso buttercream, and dark chocolate ganache.
              </p>
            </div>
            <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
              <span className="text-sm font-bold">$18.00</span>
              <span className="text-xs font-semibold uppercase text-gray-400">Product Card Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureCollection;
