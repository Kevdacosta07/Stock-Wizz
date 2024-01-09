import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {get} from "axios";
import ArticlesService from "./articlesService";

const initialState = {
    articles : [],
    userArticles: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ''
}

export const getAllArticles = createAsyncThunk(
    'articles/all',
    async (_, thunkAPI) => {
        try
        {
            return await ArticlesService.getAllArticles()
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getUserArticles = createAsyncThunk(
    'articles',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ArticlesService.getUserArticles(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteArticle = createAsyncThunk(
    'articles/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ArticlesService.deleteArticles(id, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers : {
        reset: (state) => initialState
    },

    extraReducers : (builder) => {
        builder
            .addCase(getAllArticles.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.articles = action.payload
            })

            .addCase(getAllArticles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getUserArticles.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getUserArticles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userArticles = action.payload
            })

            .addCase(getUserArticles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteArticle.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userArticles = state.userArticles.filter(
                    (article) => article._id !== action.payload.id
                )
            })

            .addCase(deleteArticle.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = articleSlice.actions
export default articleSlice.reducer