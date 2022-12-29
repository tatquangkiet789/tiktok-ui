import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { ILoginFormValue } from 'models/login';
import { IUser } from 'models/user';
import { toast } from 'react-toastify';

interface IAuthState {
    loading: boolean;
    currentUser: IUser;
    accessToken: string;
    error: string;
    loginMessage: string;
    registerMessage: string;
}

const initialState: IAuthState = {
    loading: false,
    currentUser: null as any,
    accessToken: '',
    error: '',
    loginMessage: '',
    registerMessage: '',
};

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk('loginUser', async (user: ILoginFormValue) => {
    const { username, password } = user;
    const response = await axiosClient.post(ENDPOINTS.login, { username, password });
    return response.data;
});

// [POST] /api/v1/auth/register
export const registerUser = createAsyncThunk('registerUser', async (user: FormData) => {
    const response = await axiosClient.post(ENDPOINTS.register, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null as any;
        },
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

                state.loginMessage = action.payload.message;
                state.currentUser = action.payload.content;
                state.accessToken = action.payload.accessToken;

                toast.success(state.loginMessage);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.registerMessage = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registerMessage = action.payload.message;

                toast.success(state.registerMessage);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            });
    },
});

export const { logoutUser, resetRegisterMessage } = authSlice.actions;

export default authSlice.reducer;
