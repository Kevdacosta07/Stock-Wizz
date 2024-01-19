import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ProductService from "./productService";
import {get} from "axios";
import productService from "./productService";

const initialState = {
    products : [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    isDeletedProduct: false,
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

export const productSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isDeletedProduct = false
            state.message = ''
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

            .addCase(addProduct.pending, (state) => {
                state.isLoading = true
            })

            .addCase(addProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })

            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer