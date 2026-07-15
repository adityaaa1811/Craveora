import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, UtensilsCrossed } from "lucide-react";
import { Button } from "../components/ui";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-surface-dark select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full text-center flex flex-col items-center gap-6 p-8 rounded-3xl border border-border/40 bg-surface shadow-lg"
      >
        {/* Animated Icon */}
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary-light/50 text-primary">
          <Compass className="w-10 h-10 animate-spin-slow" />
          <UtensilsCrossed className="w-5 h-5 absolute text-secondary" />
        </div>

        {/* Decorative 404 text */}
        <span className="text-6xl font-black text-primary tracking-widest leading-none">
          404
        </span>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
          Gourmet Destination Lost
        </h2>

        {/* Subtext */}
        <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-sm">
          The culinary journey you are searching for is currently off the menu, retired, or temporarily unavailable.
        </p>

        {/* Action button */}
        <div className="flex gap-3 w-full mt-2">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex-grow justify-center py-3"
          >
            Go Home
          </Button>
          <Button
            onClick={() => navigate("/menu")}
            className="flex-grow justify-center py-3"
          >
            Explore Menu
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
