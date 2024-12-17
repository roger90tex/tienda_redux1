import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/productActions";

// Estado inicial del carrito (vacío)
const initialState = [];

// Reducer para manejar el carrito
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];

    case REMOVE_FROM_CART:
      return state.filter((product) => product.id !== action.payload);

    default:
      return state;
  }
};

export default cartReducer;
