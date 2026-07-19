import React, { useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Breadcrumb } from "../../ui";
import { products } from "../../../features/menu/data/products";
import RouteLoader from "../../common/RouteLoader";

const titleMap = {
  "/": "Home",
  "/menu": "Gourmet Menu",
  "/cart": "Gourmet Bag",
  "/checkout": "Secure Checkout",
  "/order-success": "Order Success",
  "/about": "Our Brand Story",
  "/contact": "Concierge Contact",
  "/profile": "My Account",
  "/forgot-password": "Recover Account",
  "/reset-password": "Reset Password",
  "/verify-email": "Account Verification",
  "/offers": "Offers & Coupons",
  "/dashboard": "Club Room Overview",
  "/dashboard/profile": "Profile Credentials",
  "/dashboard/addresses": "Delivery Coordinates",
  "/dashboard/orders": "Order Archive",
  "/dashboard/wishlist": "Gourmet Wishlist",
  "/dashboard/settings": "System Settings"
};

export const MainLayout = () => {
  const location = useLocation();

  // Scroll to top and update page titles on location pathname updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // change to instant to avoid jumpy transition scrolling

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
          <Suspense fallback={<RouteLoader />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
