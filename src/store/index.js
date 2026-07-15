import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadState } from "./localStorage";
import { persistenceMiddleware } from "./middleware";

// Load persisted state from localStorage to initialize the store
const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Allows passing rich parameters if required
    }).concat(persistenceMiddleware)
});

export default store;
