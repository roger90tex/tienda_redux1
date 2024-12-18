// src/redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Estado inicial
const initialState = {
  products: [],       // Lista de productos
  loading: false,     // Estado de carga
  error: null,        // Mensaje de error
};

// AsyncThunk para obtener productos de la API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data; // Devuelve los datos si la solicitud es exitosa
    } catch (error) {
      return thunkAPI.rejectWithValue('Error al cargar productos');
    }
  }
);

// Slice de productos
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; // Actualiza la lista de productos.
    },
  },
  extraReducers: (builder) => { // Aquí está el cambio correcto
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;  // Activa el estado de carga
        state.error = null;    // Resetea el error
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;         // Desactiva el estado de carga
        state.products = action.payload; // Actualiza los productos
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;         // Desactiva el estado de carga
        state.error = action.payload;  // Guarda el error
      });
  },
});

// Exporta las acciones
export const { setProducts } = productsSlice.actions;

// Exporta el reducer
export default productsSlice.reducer;


