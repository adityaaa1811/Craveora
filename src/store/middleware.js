import { saveState } from "./localStorage";

/**
 * Custom middleware that intercepts actions modifying auth, cart, wishlist, or theme,
 * and automatically triggers saving to localStorage.
 */
export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const actionType = action.type;
  
  // Persist only when changes occur in persistent slices
  if (
    actionType.startsWith("cart/") ||
    actionType.startsWith("wishlist/") ||
    actionType.startsWith("auth/") ||
    actionType.startsWith("theme/")
  ) {
    saveState(store.getState());
  }

  return result;
};
