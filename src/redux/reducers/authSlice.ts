import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IAuth, ILogin } from 'modules/auth/models/authModel';
import {
    findCurrentUserByAccessTokenService,
    loginUserService,
    logoutUserService,
    registerUserService,
} from 'modules/auth/services/authService';
import { toast } from 'react-toastify';

interface IAuthState {
    loading: boolean;
    currentUser: IAuth;
    error: string;
    registerMessage: string;
    accessToken: string;
}

const initialState: IAuthState = {
    loading: false,
    currentUser: null as any,
    error: '',
    registerMessage: '',
    accessToken: '',
};

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (value: ILogin, { rejectWithValue }) => {
        try {
            const data = await loginUserService(value);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/auth/register
export const registerUser = createAsyncThunk(
    'registerUser',
    async (user: FormData, { rejectWithValue }) => {
        try {
            const data = await registerUserService(user);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /api/v1/users/current-user
export const findCurrentUserByAccessToken = createAsyncThunk(
    'findCurrentUserByAccessToken',
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const data = await findCurrentUserByAccessTokenService(accessToken);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/auth/logout
export const logoutUser = createAsyncThunk('logoutUser', async () => {
    const data = await logoutUserService();
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetRegisterMessage: (state) => {
            state.registerMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.content;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
        //     // Find Current User By Access Token
        //     .addCase(findCurrentUserByAccessToken.pending, (state) => {
        //         state.loading = true;
        //         state.error = '';
        //     })
        //     .addCase(findCurrentUserByAccessToken.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.currentUser = action.payload.content;
        //     })
        //     .addCase(findCurrentUserByAccessToken.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = (action.payload as AxiosError)
        //             ? (action.payload as AxiosError).message
        //             : action.error.message!;
        //         toast.error(state.error);
        //     })
        //     // Logout User
        //     .addCase(logoutUser.pending, (state) => {
        //         state.loading = true;
        //         state.error = '';
        //     })
        //     .addCase(logoutUser.fulfilled, (state, action) => {
        //         state.loading = false;
        //         toast.success(action.payload.message);
        //         state.currentUser = null as any;
        //         sessionStorage.clear();
        //     })
        //     .addCase(logoutUser.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.error.message!;
        //         toast.error(state.error);
        //     });
    },
});

export const { resetRegisterMessage } = authSlice.actions;

export default authSlice.reducer;
