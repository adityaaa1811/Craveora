import React from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOAST_THEMES = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-success" />,
    class: "border-success-light bg-emerald-50 text-success-hover"
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-error" />,
    class: "border-error-light bg-red-50 text-error-hover"
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    class: "border-blue-100 bg-blue-50 text-blue-900"
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-warning" />,
    class: "border-warning-light bg-amber-50 text-warning-hover"
  }
};

export const Toast = ({
  isOpen = false,
  onClose,
  message,
  variant = "info",
  className = "",
  ...props
}) => {
  const theme = TOAST_THEMES[variant] || TOAST_THEMES.info;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.4 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-premium max-w-sm select-none z-toast ${theme.class} ${className}`}
          role="alert"
          {...props}
        >
          <span className="shrink-0">{theme.icon}</span>
          <p className="text-sm font-semibold flex-grow leading-tight">
            {message}
          </p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-0.5 rounded-full hover:bg-black/5 text-current/60 hover:text-current transition-colors focus-visible:outline-2 focus-visible:outline-primary cursor-pointer shrink-0"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
