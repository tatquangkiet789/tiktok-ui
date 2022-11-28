import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CURRENT_USER } from '../constants/constants';
import { User } from '../models/user';
import axiosClient from '../utils/axiosClient';
import { toast } from 'react-toastify';

interface IAuthState {
    loading: boolean;
    currentUser: User;
    error: string;
    message: string;
}

const initialState: IAuthState = {
    loading: false,
    currentUser: null as any,
    error: '',
    message: '',
};

export const loginUser = createAsyncThunk(
    'loginUser',
    async ({ username, password }: { username: string; password: string }) => {
        const response = await axiosClient.post('/v1/auth/login', { username, password });
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.content;
                state.message = action.payload.message;

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
