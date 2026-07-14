/**
 * Craveora Design System - Master Theme Object
 * Consolidates all design system tokens for JS/React environments.
 */

import colors from "./colors";
import spacing from "./spacing";
import { fontSizes, fontWeights, lineHeights } from "./typography";

export const theme = {
  // Brand Colors
  colors,

  // Spacing Scale
  spacing,

  // Typography Options
  typography: {
    fontSizes,
    fontWeights,
    lineHeights,
    fontFamily: {
      primary: "'Manrope', sans-serif",
    }
  },

  // Border Radius Scale
  borderRadius: {
    none: "0px",
    xs: "0.125rem",  // 2px
    sm: "0.25rem",   // 4px
    md: "0.375rem",  // 6px
    lg: "0.5rem",    // 8px
    xl: "0.75rem",   // 12px
    "2xl": "1rem",     // 16px
    "3xl": "1.5rem",   // 24px
    "4xl": "2rem",     // 32px
    full: "9999px",
  },

  // Premium Custom Shadows
  shadows: {
    sm: "0 1px 3px rgba(124, 1, 22, 0.05)",
    md: "0 4px 12px rgba(124, 1, 22, 0.04), 0 2px 4px rgba(29, 29, 29, 0.02)",
    lg: "0 12px 28px rgba(124, 1, 22, 0.06), 0 4px 10px rgba(29, 29, 29, 0.03)",
    xl: "0 20px 40px rgba(124, 1, 22, 0.08), 0 8px 16px rgba(29, 29, 29, 0.04)",
    premium: "0 30px 60px rgba(124, 1, 22, 0.12), 0 12px 24px rgba(29, 29, 29, 0.06)",
    inner: "inset 0 2px 4px rgba(29, 29, 29, 0.06)",
  },

  // Transition & Motion System
  transitions: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },

  // Z-Index Hierarchy
  zIndex: {
    negative: -1,
    normal: 1,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modal: 400,
    popover: 500,
    toast: 600,
    max: 9999,
  },

  // Responsive Container Breakpoint Constraints
  containerWidths: {
    xs: "320px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },
};

export default theme;
