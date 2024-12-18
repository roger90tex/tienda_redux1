import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from '../redux/slice/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();

  // Cambiado a "cartItems" para coincidir con el estado definido en cartSlice.js
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (cartItems.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <button onClick={() => dispatch(clearCart())}>Vaciar Carrito</button>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <h3>{item.title}</h3>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio: ${item.price}</p>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;


