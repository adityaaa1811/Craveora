/**
 * Craveora Design System - Brand Color Palette
 * Coordinates perfectly with tailwind custom properties inside variables.css
 */

export const colors = {
  // Brand Main Colors
  primary: {
    DEFAULT: "#7C0116",      // Deep Burgundy/Crimson
    hover: "#610010",        // Darker shade for active/hover states
    light: "#FDF1F3",        // Tint for card background highlights/badges
  },
  secondary: {
    DEFAULT: "#E0A4B0",    // Warm premium rose blush
    hover: "#D18A98",      // Slightly darker hover state
    light: "#FBF0F2",      // Super soft blush tint
  },

  // Base Backgrounds
  background: {
    DEFAULT: "#FFF8F3",   // Luxurious warm ivory/cream
    surface: "#FFFFFF",   // Pure white for cards/modals
  },

  // Typography Colors
  text: {
    primary: "#1D1D1D",   // Soft charcoal (high contrast/legible)
    secondary: "#555555", // Mid-tone charcoal (sub-headers/metadata)
    muted: "#888888",     // Soft gray for inactive or disabled text
  },

  // UI Accents & Statuses
  success: {
    DEFAULT: "#2E7D32",   // Forest green for successes
    light: "#E8F5E9",
    hover: "#1B5E20",
  },
  warning: {
    DEFAULT: "#D97706",   // Warm amber for warnings
    light: "#FEF3C7",
    hover: "#B45309",
  },
  error: {
    DEFAULT: "#D32F2F",   // Deep crimson red for errors
    light: "#FFEBEE",
    hover: "#C62828",
  },

  // Boarders & Dividers
  border: {
    DEFAULT: "#E8E2DE",   // Soft warm gray border
    light: "#F5EFEA",     // Extra faint divider
  },

  // Overlays
  overlay: {
    DEFAULT: "rgba(29, 29, 29, 0.4)",
    dark: "rgba(29, 29, 29, 0.7)",
  }
};

export default colors;
