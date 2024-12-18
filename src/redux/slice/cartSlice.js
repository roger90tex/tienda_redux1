// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Lista de productos en el carrito
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      // Buscar si el producto ya existe en el carrito
      const existingProduct = state.cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        // Incrementa la cantidad si el producto ya existe en el carrito
        existingProduct.quantity += 1;
      } else {
        // Agrega el producto al carrito con una cantidad inicial de 1
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      // Filtra los productos para eliminar el producto con el ID dado
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
    },
    clearCart: (state) => {
      // Limpia todos los productos del carrito
      state.cartItems = [];
    },
  },
});

// Exporta las acciones
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Exporta el reducer
export default cartSlice.reducer;


