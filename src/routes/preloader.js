export const preloadMap = {
  "/": () => import("../pages/Home"),
  "/menu": () => import("../pages/Menu"),
  "/cart": () => import("../pages/Cart"),
  "/checkout": () => import("../pages/CheckoutPage"),
  "/about": () => import("../pages/About"),
  "/contact": () => import("../pages/Contact"),
  "/offers": () => import("../pages/OffersPage")
};

export const preloadRoute = (path) => {
  let loader = preloadMap[path];
  
  if (!loader && path.startsWith("/menu/")) {
    loader = () => import("../pages/ProductDetails");
  }

  if (loader) {
    loader().catch((err) => {
      // Gracefully capture loading errors (offline/preloading failures)
      console.warn(`Dynamic route preload failed for path ${path}:`, err);
    });
  }
};

export default preloadRoute;
