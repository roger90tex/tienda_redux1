import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/productActions";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => dispatch(addToCart(product))}>
              Agregar al Carrito
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

