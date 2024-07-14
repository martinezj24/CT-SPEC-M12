import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// AsyncThunk to fetch product data by ID

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id) => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product data');
        }
        return await response.json();
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        product: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.pending, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchProductById.pending, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
       
    },
});

export default productSlice.reducer