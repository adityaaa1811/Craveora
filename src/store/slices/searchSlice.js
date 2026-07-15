import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  filters: {
    category: "all",
    priceRange: [0, 100],
    rating: 0
  },
  sort: "default" // values: 'default', 'price-low-to-high', 'price-high-to-low', 'rating'
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.filters = initialState.filters;
      state.sort = "default";
    }
  }
});

// Actions
export const { setQuery, setFilters, setSort, clearSearch } = searchSlice.actions;

// Selectors
export const selectSearchQuery = (state) => state.search.query;
export const selectSearchFilters = (state) => state.search.filters;
export const selectSearchSort = (state) => state.search.sort;

// Reducer
export default searchSlice.reducer;
