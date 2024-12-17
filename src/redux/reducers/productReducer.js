// Estado inicial con productos disponibles
const initialState = [
    { id: 1, name: "Producto 1", price: 100 },
    { id: 2, name: "Producto 2", price: 200 },
    { id: 3, name: "Producto 3", price: 300 },
  ];
  
  // Reducer para productos (por ahora no cambia)
  const productReducer = (state = initialState, action) => {
    return state;
  };
  
  export default productReducer;
  
