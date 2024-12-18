import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import cartReducer from "./slice/cartSlice";

// Crea el store con los reducers
const store = configureStore({
  reducer: {
    products: productsReducer, // Reducer de productos
    cart: cartReducer, // Reducer del carrito
  },
});

export default store;



