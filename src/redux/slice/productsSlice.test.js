import { fetchProducts } from "./productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Crear una instancia de MockAdapter para Axios
const mock = new MockAdapter(axios);

describe("productsSlice - fetchProducts", () => {
  let store;

  // Configurar el store antes de cada prueba
  beforeEach(() => {
    store = configureStore({
      reducer: { products: productsReducer },
      middleware: [thunk],
    });
  });

  it("debería manejar correctamente el estado de carga mientras se obtienen los productos (caso exitoso)", async () => {
    const mockProducts = [
      { id: 1, title: "Producto 1", price: 100 },
      { id: 2, title: "Producto 2", price: 200 },
    ];

    // Simular una respuesta exitosa de la API
    mock.onGet("https://fakestoreapi.com/products").reply(200, mockProducts);

    // Disparar la acción de obtener productos
    await store.dispatch(fetchProducts());

    const state = store.getState().products;

    // Validar los resultados esperados
    expect(state.loading).toBe(false);
    expect(state.products).toEqual(mockProducts);
    expect(state.error).toBe(null);
  });

  it("debería manejar correctamente un error al fallar la carga de productos", async () => {
    // Simular una respuesta fallida de la API
    mock.onGet("https://fakestoreapi.com/products").reply(500);

    // Disparar la acción de obtener productos
    await store.dispatch(fetchProducts());

    const state = store.getState().products;

    // Validar los resultados esperados
    expect(state.loading).toBe(false);
    expect(state.products).toEqual([]);
    expect(state.error).toBe("Error al cargar productos");
  });
});


