import { createStore, combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";

// Combina los reducers
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

// Crea el store
const store = createStore(rootReducer);

export default store;


