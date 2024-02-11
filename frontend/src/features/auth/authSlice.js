import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    users: [],
    specificUser: [],
    isDeletedUser: false,
    isCreatedUser: false,
    isUpdatedUser: false,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
    checkUser: false
}

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getSpecificUser = createAsyncThunk(
    'auth/user',
    async (id, thunkAPI) => {
        try {
            return await authService.getSpecificUser(id)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    'auth/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.deleteUser(id, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateUser = createAsyncThunk(
    'auth/edit',
    async (payload, thunkAPI) => {
        const { id, user } = payload
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.updateUser(id, user, token)
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const userExist = createAsyncThunk(
    "auth/checkUser",
    async (userData, thunkAPI) => {
        try {
            return await authService.userExist(userData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async  () => {
        await authService.logout()
    }
)

export const getAllUsers = createAsyncThunk(
    'auth/all',
    async (_, thunkAPI) => {
        try
        {
            return await authService.getAllUsers()
        }
        catch (error)
        {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isDeletedUser = false
            state.isCreatedUser = false
            state.isUpdatedUser = false
            state.message = ''
            state.checkUser = false
        },

        resetCheckUser: (state) => {
            state.checkUser = false
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
            state.isLoading = true
            })

            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isCreatedUser = true
                state.user = action.payload
            })

            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isDeletedUser = true
            })

            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdatedUser = true
            })

            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })

            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getSpecificUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getSpecificUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.specificUser = action.payload
            })

            .addCase(getSpecificUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true
            })

            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })

            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })

            .addCase(userExist.pending, (state) => {
                state.isLoading = true
            })

            .addCase(userExist.fulfilled, (state) => {
                state.isLoading = false
                state.checkUser = true
            })

            .addCase(userExist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                console.log(action.payload)
            })
    }
})

export const {reset, resetCheckUser} = authSlice.actions

export default authSlice.reducer