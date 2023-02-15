import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IAuthDTO } from '../models/authDTO';
import { ILoginDTO } from '../models/loginDTO';
import { loginUserService, registerUserService } from '../services/authService';

interface IAuthState {
    authLoading: boolean;
    currentUser: IAuthDTO;
    authError: string;
}

const initialState: IAuthState = {
    authLoading: false,
    currentUser: null as any,
    authError: '',
};

// [POST] /api/v1/auth/login
export const loginUser = createAsyncThunk(
    'loginUser',
    async (value: ILoginDTO): Promise<IAuthDTO> => {
        const response = await loginUserService(value);
        return response;
    },
);

// [POST] /api/v1/auth/register
export const registerUser = createAsyncThunk(
    'registerUser',
    async (user: FormData): Promise<string> => {
        const response = await registerUserService(user);
        return response;
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
                state.authLoading = true;
                state.currentUser = null as any;
                state.authError = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.error.message!;
                toast.error(state.authError);
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.authLoading = true;
                state.authError = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.error.message!;
                toast.error(state.authError);
            });
    },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
