import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import { IAuth } from 'layouts/AuthLayout/models/auth';
import { ILoginFormValue } from 'layouts/AuthLayout/models/login';
import axiosClient from 'libs/axiosClient';
import { toast } from 'react-toastify';

interface IAuthState {
    authLoading: boolean;
    currentUser: IAuth;
    error: string;
    registerMessage: string;
    accessToken: string;
}

const initialState: IAuthState = {
    authLoading: false,
    currentUser: null as any,
    error: '',
    registerMessage: '',
    accessToken: '',
};

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (value: ILoginFormValue): Promise<IAuth> => {
        const { username, password } = value;
        const { data } = await axiosClient.post(ENDPOINTS.login, { username, password });
        return data.content;
    },
);

// [POST] /api/v1/auth/register
export const registerUser = createAsyncThunk(
    'registerUser',
    async (user: FormData): Promise<string> => {
        const { data } = await axiosClient.post(ENDPOINTS.register, user, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data.message;
    },
);

// [GET] /api/v1/users/current-user
export const findCurrentUserByAccessToken = createAsyncThunk(
    'findCurrentUserByAccessToken',
    async (accessToken: string) => {
        const response = await axiosClient.get(ENDPOINTS.findCurrentUserByAccessToken, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null as any;
            localStorage.removeItem('accessToken');
        },
        resetRegisterMessage: (state) => {
            state.registerMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.authLoading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authLoading = false;
                state.error = action.error.message!;
                toast.error(state.error);
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.authLoading = true;
                state.error = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authLoading = false;
                state.error = action.error.message!;
                toast.error(state.error);
            })
            // Find Current User By Access Token
            .addCase(findCurrentUserByAccessToken.pending, (state) => {
                state.authLoading = true;
                state.error = '';
            })
            .addCase(findCurrentUserByAccessToken.fulfilled, (state, action) => {
                state.authLoading = false;
                state.currentUser = action.payload.content;
            })
            .addCase(findCurrentUserByAccessToken.rejected, (state, action) => {
                state.authLoading = false;
                state.error = action.error.message!;
                toast.error(state.error);
            });
    },
});

export const { logoutUser, resetRegisterMessage } = authSlice.actions;

export default authSlice.reducer;
