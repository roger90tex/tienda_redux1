import { addToCart } from "./cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

describe("cartSlice - addToCart", () => {
  let store;

  // Configurar un nuevo store antes de cada prueba
  beforeEach(() => {
    store = configureStore({
      reducer: { cart: cartReducer },
    });
  });

  it("debería agregar un producto al carrito correctamente", () => {
    const product = { id: 1, title: "Producto 1", price: 100, quantity: 1 };

    // Dispatch de la acción para agregar el producto
    store.dispatch(addToCart(product));

    // Obtener el estado actual del carrito
    const state = store.getState().cart;

    // Verificar que se haya agregado un producto
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual(product);
  });

  it("debería incrementar la cantidad de un producto si ya existe en el carrito", () => {
    const product = { id: 1, title: "Producto 1", price: 100, quantity: 1 };

    // Dispatch de la acción para agregar el mismo producto dos veces
    store.dispatch(addToCart(product));
    store.dispatch(addToCart(product)); // Producto duplicado

    // Obtener el estado actual del carrito
    const state = store.getState().cart;

    // Verificar que el producto no se duplique y que solo se incremente su cantidad
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("debería agregar un segundo producto diferente al carrito", () => {
    const product1 = { id: 1, title: "Producto 1", price: 100, quantity: 1 };
    const product2 = { id: 2, title: "Producto 2", price: 150, quantity: 1 };

    // Dispatch de la acción para agregar dos productos diferentes
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    // Obtener el estado actual del carrito
    const state = store.getState().cart;

    // Verificar que ambos productos estén en el carrito
    expect(state.items.length).toBe(2);
    expect(state.items[0]).toEqual(product1);
    expect(state.items[1]).toEqual(product2);
  });
});


