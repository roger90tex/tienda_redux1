import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from '../redux/slice/productsSlice';
import { addToCart } from '../redux/slice/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  
  // Obtenemos los datos de los productos del estado global
  const { products, loading, error } = useSelector((state) => state.products);

  // Despachar `fetchProducts` cuando el componente se monte
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Mostrar un mensaje de carga mientras se obtienen los productos
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  // Mostrar un mensaje de error si ocurre un problema al cargar los productos
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Lista de Productos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              width: '200px',
            }}
          >
            <h3>{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <p>${product.price}</p>
            {/* Botón para agregar al carrito */}
            <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


    

