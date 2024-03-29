import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ProductService from "./productService";
import {get} from "axios";
import productService from "./productService";
import authService from "../auth/authService";

const initialState = {
    products : [],
    product: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    isDeletedProduct: false,
    isCreatedProduct: false,
    isEditedProduct: false,
    message: ''
}

export const getAllProducts = createAsyncThunk(
    'products/all',
    async (_, thunkAPI) => {
        try
        {
            return await ProductService.getAllProducts()
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSpecificProduct = createAsyncThunk(
    'products/product',
    async (id, thunkAPI) => {
        try
        {
            return await ProductService.getSpecificProduct(id)
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const addProduct = createAsyncThunk(
    "products/add",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await productService.addProduct(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ProductService.deleteProducts(id, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'auth/edit',
    async (payload, thunkAPI) => {
        const { id, product } = payload
        try {
            const token = thunkAPI.getState().auth.user.token
            return await productService.updateProduct(id, product, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isDeletedProduct = false
            state.isCreatedProduct = false
            state.isEditedProduct = false
            state.message = ''
            state.product = {}
        }
    },

    extraReducers : (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })

            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getSpecificProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getSpecificProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.product = action.payload
            })

            .addCase(getSpecificProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isDeletedProduct = true
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isEditedProduct = true
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isCreatedProduct = true
            })

            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetProducts} = productSlice.actions
export default productSlice.reducer