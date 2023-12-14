import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Login } from '../models/authModel';
import {
    findCurrentUserByAccessTokenService,
    loginUserService,
    logoutUserService,
    registerUserService,
} from './authService';

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (value: Login, { rejectWithValue }) => {
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
