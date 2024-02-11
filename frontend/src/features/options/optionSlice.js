import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "axios";
import optionService from "./optionService";
import productService from "../products/productService";

const initialState = {
    options : [],
    option: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    isDeletedOption: false,
    isEditedOption: false,
    isAmountEditedOption: false,
    isCreatedOption: false,
    message: ''
}

export const getAllOptions = createAsyncThunk(
    'options/all',
    async (_, thunkAPI) => {
        try
        {
            return await optionService.getAllOptions()
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSpecificOption = createAsyncThunk(
    'options/option',
    async (optionId, thunkAPI) => {
        try
        {
            return await optionService.getSpecificOption(optionId)
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getProductOptions = createAsyncThunk(
    'options/product',
    async (product_id, thunkAPI) => {
        try
        {
            return await optionService.getProductOptions(product_id)
        }

        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const addOption = createAsyncThunk(
    "options/add",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await optionService.addOption(data, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteOption = createAsyncThunk(
    'options/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await optionService.deleteOption(id, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateOption = createAsyncThunk(
    'options/edit',
    async (payload, thunkAPI) => {
        const { id, option } = payload
        try {
            const token = thunkAPI.getState().auth.user.token
            return await optionService.updateOption(id, option, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateAmountOption = createAsyncThunk(
    'options/editAmount',
    async (payload, thunkAPI) => {
        const { id, option } = payload
        try {
            const token = thunkAPI.getState().auth.user.token
            return await optionService.updateAmountOption(id, option, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const optionSlice = createSlice({
    name: "options",
    initialState,
    reducers: {
        optionReset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isDeletedOption = false
            state.isCreatedOption = false
            state.isEditedOption = false
            state.isAmountEditedOption = false
            state.message = ''
        }
    },

    extraReducers : (builder) => {
        builder
            .addCase(getAllOptions.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllOptions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.options = action.payload
            })

            .addCase(getAllOptions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getSpecificOption.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getSpecificOption.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.option = action.payload
            })

            .addCase(getSpecificOption.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getProductOptions.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getProductOptions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.options = action.payload
            })

            .addCase(getProductOptions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteOption.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteOption.fulfilled, (state) => {
                state.isLoading = false
                state.isDeletedOption = true
            })

            .addCase(deleteOption.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateOption.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateOption.fulfilled, (state) => {
                state.isLoading = false
                state.isEditedOption = true
            })

            .addCase(updateOption.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateAmountOption.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateAmountOption.fulfilled, (state) => {
                state.isLoading = false
                state.isAmountEditedOption = true
            })

            .addCase(updateAmountOption.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(addOption.pending, (state) => {
                state.isLoading = true
            })

            .addCase(addOption.fulfilled, (state) => {
                state.isLoading = false
                state.isCreatedOption = true
            })

            .addCase(addOption.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {optionReset} = optionSlice.actions
export default optionSlice.reducer