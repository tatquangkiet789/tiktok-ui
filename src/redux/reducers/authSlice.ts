import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ENDPOINTS from '../../constants/endpoints';
import axiosClient from '../../libs/axiosClient';
import { IUser } from '../../models/user';

interface IAuthState {
    loading: boolean;
    currentUser: IUser;
    accessToken: string;
    error: string;
    message: string;
}

const initialState: IAuthState = {
    loading: false,
    currentUser: null as any,
    accessToken: '',
    error: '',
    message: '',
};

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk(
    'loginUser',
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axiosClient.post(ENDPOINTS.login, { username, password });
        return response.data;
    },
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null as any;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;

                state.message = action.payload.message;
                state.currentUser = action.payload.content;
                state.accessToken = action.payload.accessToken;

                toast.success(state.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            });
    },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
