import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ProductList from "./ProductList";

const mockStore = configureMockStore([thunk]);

describe("ProductList Component", () => {
  it("debería mostrar 'Cargando productos...' mientras los productos están cargando", () => {
    const store = mockStore({
      products: { products: [], loading: true, error: null },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/Cargando productos.../i)).toBeInTheDocument();
  });

  it("debería mostrar un mensaje de error si hay un error al cargar los productos", () => {
    const store = mockStore({
      products: { products: [], loading: false, error: "Error al cargar los productos" },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText(/Error: Error al cargar los productos/i)).toBeInTheDocument();
  });

  it("debería renderizar una lista de productos cuando se cargan correctamente", () => {
    const store = mockStore({
      products: {
        products: [
          { id: 1, title: "Producto 1", price: 100, image: "image1.jpg" },
          { id: 2, title: "Producto 2", price: 200, image: "image2.jpg" },
        ],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText("Producto 1")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Producto 2")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  it("debería despachar la acción 'addToCart' al hacer clic en el botón 'Agregar al carrito'", () => {
    const store = mockStore({
      products: {
        products: [
          { id: 1, title: "Producto 1", price: 100, image: "image1.jpg" },
        ],
        loading: false,
        error: null,
      },
      cart: { items: [] },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    const button = screen.getByText("Agregar al carrito");
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "cart/addToCart",
      payload: { id: 1, title: "Producto 1", price: 100, image: "image1.jpg", quantity: 1 },
    });
  });
});
