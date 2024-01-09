import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ProductService from "./productService";
import {get} from "axios";

const initialState = {
    products : [],
    isSuccess: false,
    isError: false,
    isLoading: false,
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

export const productSlide = createSlice({
    name: "products",
    initialState,
    reducers : {
        reset: (state) => initialState
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

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })

            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = productSlide.actions
export default productSlide.reducer