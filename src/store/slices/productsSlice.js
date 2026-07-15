import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  categories: [],
  loading: false,
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

// Actions
export const { setProducts, setLoading, setError, setCategories } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectCategories = (state) => state.products.categories;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

// Reducer
export default productsSlice.reducer;
