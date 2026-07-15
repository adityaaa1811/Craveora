import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Ingredients from "../Ingredients";
import Nutrition from "../Nutrition";
import Reviews from "../Reviews";

export const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return null;

  const tabs = [
    { id: "description", label: "Details" },
    { id: "ingredients", label: "Ingredients" },
    { id: "nutrition", label: "Nutrition" },
    { id: "reviews", label: `Reviews (${product.reviewCount})` }
  ];

  return (
    <div id="product-tabs-container" className="flex flex-col gap-6 w-full mt-8 scroll-mt-20">
      {/* Tabs Header */}
      <div className="flex border-b border-border-light/80 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-4 px-6 text-sm font-bold tracking-wide transition-colors shrink-0 cursor-pointer ${
                isActive ? "text-primary" : "text-text-secondary hover:text-primary"
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs Body Content */}
      <div className="min-h-[220px] py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "description" && (
              <div className="flex flex-col gap-4">
                <h4 className="text-base font-bold text-text-primary">
                  Dish Summary
                </h4>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed max-w-3xl">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 bg-primary-light/40 border border-primary/5 rounded-2xl">
                    <h5 className="text-xs font-bold text-primary mb-1">
                      Perfect Temperature
                    </h5>
                    <p className="text-2xs text-text-secondary leading-normal">
                      Prepared fresh and delivered in thermo-insulated bags to retain restaurant heat and crispness.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary-light/40 border border-secondary/5 rounded-2xl">
                    <h5 className="text-xs font-bold text-primary mb-1">
                      Chef Recommendation
                    </h5>
                    <p className="text-2xs text-text-secondary leading-normal">
                      Pairs exceptionally well with dry white wines or citrus-infused sparkling botanical juices.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <Ingredients ingredients={product.ingredients} />
            )}

            {activeTab === "nutrition" && (
              <Nutrition nutrition={product.nutrition} />
            )}

            {activeTab === "reviews" && (
              <Reviews
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductTabs;
