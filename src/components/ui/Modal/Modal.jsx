import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({
  isOpen = false,
  onClose,
  title,
  children,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
  ...props
}) => {
  // ESC Close Support & Body Scroll Lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          {...props}
        >
          {/* Animated Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            className="absolute inset-0 bg-overlay-dark backdrop-blur-sm cursor-pointer"
          />

          {/* Animated Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
            className={`relative w-full max-w-lg bg-surface border border-border/40 rounded-3xl shadow-premium overflow-hidden z-10 flex flex-col ${className}`}
          >
            {/* Modal Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-5 border-b border-border-light/80">
                {title && (
                  <h3 id="modal-title" className="text-lg font-extrabold text-text-primary tracking-tight leading-none">
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1 rounded-full text-text-muted hover:text-primary hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-primary cursor-pointer ml-auto"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Modal Body */}
            <div className="px-6 py-5 overflow-y-auto max-h-[70vh]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
