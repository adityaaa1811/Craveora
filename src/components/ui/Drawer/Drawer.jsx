import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEMENT_VARIANTS = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    class: "left-0 top-0 bottom-0 h-full w-full max-w-sm border-r"
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    class: "right-0 top-0 bottom-0 h-full w-full max-w-sm border-l"
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    class: "left-0 right-0 bottom-0 w-full h-[50vh] border-t"
  }
};

export const Drawer = ({
  isOpen = false,
  onClose,
  placement = "right",
  title,
  children,
  closeOnOverlayClick = true,
  className = "",
  ...props
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const placementConfig = PLACEMENT_VARIANTS[placement] || PLACEMENT_VARIANTS.right;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
          {...props}
        >
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="absolute inset-0 bg-overlay-dark backdrop-blur-2xs cursor-pointer"
          />

          {/* Drawer Container Panel */}
          <motion.div
            initial={placementConfig.initial}
            animate={placementConfig.animate}
            exit={placementConfig.exit}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bg-surface border-border/40 shadow-premium overflow-hidden flex flex-col z-10 ${placementConfig.class} ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border-light/80">
              {title ? (
                <h3 id="drawer-title" className="text-base font-extrabold text-text-primary tracking-tight leading-none">
                  {title}
                </h3>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-text-muted hover:text-primary hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-grow p-6 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
