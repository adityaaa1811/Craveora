import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

// Actions
export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id);

// Reducer
export default wishlistSlice.reducer;
