import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import ENDPOINTS from 'constants/endpoints';
import { IAuth } from 'layouts/AuthLayout/models/auth';
import { ILoginFormValue } from 'layouts/AuthLayout/models/login';
import axiosClient, { privateAxios } from 'libs/axiosClient';
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
export const loginUser = createAsyncThunk('loginUser', async (value: ILoginFormValue) => {
    const { username, password } = value;
    const response = await axiosClient.post(ENDPOINTS.login, {
        username,
        password,
    });
    return response.data;
});

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
    async (accessToken: string, { rejectWithValue }) => {
        try {
            const response = await privateAxios.get(
                ENDPOINTS.findCurrentUserByAccessToken,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    withCredentials: true,
                },
            );
            return response.data;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    },
);

// [POST] /api/v1/auth/refresh-token
export const refreshToken = createAsyncThunk('refreshToken', async () => {
    const response = await privateAxios.post(ENDPOINTS.refreshToken);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null as any;
            localStorage.clear();
        },
        resetRegisterMessage: (state) => {
            state.registerMessage = '';
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.currentUser.accessToken = action.payload;
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
                state.currentUser = action.payload.content;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authLoading = false;
                state.error = action.error.message!;
                toast.error(state.error);
                toast.error((action.payload as AxiosError).message);
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
                state.error = (action.payload as AxiosError).message;
                toast.error(state.error);
            })
            // Refresh token
            .addCase(refreshToken.pending, (state) => {
                state.authLoading = true;
                state.error = '';
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.authLoading = false;
                state.currentUser.accessToken = action.payload.content;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.authLoading = false;
                state.error = (action.payload as AxiosError).message;
                toast.error(state.error);
            });
    },
});

export const { logoutUser, resetRegisterMessage, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
