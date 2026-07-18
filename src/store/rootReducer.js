import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authReducer from "./slices/authSlice";
import searchReducer from "./slices/searchSlice";
import productsReducer from "./slices/productsSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import profileReducer from "./slices/profileSlice";
import ordersReducer from "./slices/ordersSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  search: searchReducer,
  products: productsReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  profile: profileReducer,
  orders: ordersReducer
});

export default rootReducer;
