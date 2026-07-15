import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Breadcrumb } from "../../ui";
import { products } from "../../../features/menu/data/products";

const titleMap = {
  "/": "Home",
  "/menu": "Gourmet Menu",
  "/cart": "Gourmet Bag",
  "/checkout": "Secure Checkout",
  "/about": "Our Brand Story",
  "/contact": "Concierge Contact",
  "/profile": "My Account"
};

export const MainLayout = () => {
  const location = useLocation();

  // Scroll to top and update page titles on location pathname updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let title = "Home";
    const path = location.pathname;

    if (path.startsWith("/menu/")) {
      const id = path.split("/").pop();
      const product = products.find((p) => p.id === id);
      title = product ? product.title : "Dish Details";
    } else if (titleMap[path]) {
      title = titleMap[path];
    } else {
      title = path.split("/").filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(" > ") || "Home";
    }

    document.title = `${title} | Craveora`;
  }, [location.pathname]);

  const showBreadcrumb = location.pathname !== "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {showBreadcrumb && (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
            <Breadcrumb />
          </div>
        )}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
