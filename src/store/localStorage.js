/**
 * Safely loads state from localStorage.
 * Returns undefined if no state exists or if there is an error to let Redux establish initial states.
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("craveora_state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state from localStorage:", error);
    return undefined;
  }
};

/**
 * Safely saves state to localStorage.
 */
export const saveState = (state) => {
  try {
    const stateToSave = {
      cart: state.cart,
      wishlist: state.wishlist,
      auth: state.auth,
      theme: state.theme
    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem("craveora_state", serializedState);
  } catch (error) {
    console.error("Could not save state to localStorage:", error);
  }
};
