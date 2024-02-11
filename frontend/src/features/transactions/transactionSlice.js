import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "axios";
import transactionService from "./transactionService";
import {addProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct} from "../products/productSlice";
import ProductService from "../products/productService";
import TransactionService from "./transactionService";

const initialState = {
    transactions : [],
    transaction: [],
    isTransactionSuccess: false,
    isTransactionError: false,
    isTransactionLoading: false,
    isDeletedTransaction: false,
    isCreatedTransaction: false,
    isEditedTransaction: false,
    transactionMessage: ''
}

export const getAllTransactions = createAsyncThunk(
    'transactions/all',
    async (_, thunkAPI) => {
        try
        {
            return await TransactionService.getAllTransactions()
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const addTransaction = createAsyncThunk(
    "transactions/add",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await transactionService.addTransaction(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        resetTransactions: (state) => {
            state.isTransactionLoading = false
            state.isTransactionSuccess = false
            state.isTransactionError = false
            state.isDeletedTransaction = false
            state.isCreatedTransaction = false
            state.isEditedTransaction = false
            state.transactionMessage = ''
        }
    },

    extraReducers : (builder) => {
        builder

            .addCase(addTransaction.pending, (state) => {
                state.isTransactionLoading = true
            })

            .addCase(addTransaction.fulfilled, (state) => {
                state.isTransactionLoading = false
                state.isCreatedTransaction = true
            })

            .addCase(addTransaction.rejected, (state, action) => {
                state.isTransactionLoading = false
                state.isTransactionError = true
                state.TransactionMessage = action.payload
            })

            .addCase(getAllTransactions.pending, (state) => {
                state.isTransactionLoading = true
            })

            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.isTransactionLoading = false
                state.isTransactionSuccess = true
                state.transactions = action.payload
            })

            .addCase(getAllTransactions.rejected, (state, action) => {
                state.isTransactionLoading = false
                state.isTransactionError = true
                state.transactionMessage = action.payload
            })
    }
})

export const {resetTransactions} = transactionSlice.actions
export default transactionSlice.reducer