import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import RouteLoader from "../components/common/RouteLoader";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background px-4 py-12 overflow-hidden">
      {/* Soft luxury ambient highlights */}
      <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-primary/4 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-secondary/8 blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<RouteLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
