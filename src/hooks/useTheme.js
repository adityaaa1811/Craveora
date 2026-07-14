import { useMemo } from "react";
import theme from "../constants/theme";

/**
 * A custom React hook to access Craveora's Design System tokens programmatically.
 * Useful for Framer Motion configs, inline styles, Canvas drawing, or SVG modifications.
 *
 * @returns {object} Theme object along with CSS custom property resolver functions.
 */
export function useTheme() {
  /**
   * Helper function to get the current computed value of any CSS custom property from the DOM.
   * Useful for retrieving actual values compiled by Tailwind or defined in variables.css.
   *
   * @param {string} variableName - The CSS variable name (e.g., 'primary' or '--color-primary')
   * @returns {string} The computed string value of the variable, or empty string.
   */
  const getPropertyValue = (variableName) => {
    if (typeof window === "undefined" || !window.document) return "";
    
    // Normalize prefix if developer passes 'color-primary' instead of '--color-primary'
    const name = variableName.startsWith("--") ? variableName : `--${variableName}`;
    return window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  };

  /**
   * Helper function to programmatically update a CSS custom property on the document root.
   * Useful for dynamic run-time adjustments or theme overrides.
   *
   * @param {string} variableName - The CSS variable name (e.g., '--color-primary')
   * @param {string} value - The value to assign (e.g., '#7C0116')
   */
  const setPropertyValue = (variableName, value) => {
    if (typeof window === "undefined" || !window.document) return;
    const name = variableName.startsWith("--") ? variableName : `--${variableName}`;
    document.documentElement.style.setProperty(name, value);
  };

  return useMemo(() => ({
    /** Master JS design system theme configuration object */
    theme,
    /** Resolve CSS variables at runtime */
    getPropertyValue,
    /** Mutate CSS variables at runtime */
    setPropertyValue,
  }), []);
}

export default useTheme;
