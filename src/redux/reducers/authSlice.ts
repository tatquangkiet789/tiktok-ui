import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Auth } from 'features/auth/models/authModel';
import { loginUser, registerUser } from 'features/auth/services/authThunk';
import { toast } from 'react-toastify';

interface IAuthState {
    isLoading: boolean;
    currentUser: Auth;
    error: string;
    registerMessage: string;
}

const initialState: IAuthState = {
    isLoading: false,
    currentUser: null as any,
    error: '',
    registerMessage: '',
};

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
                state.isLoading = true;
                state.currentUser = null as any;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload.content;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
        //     // Find Current User By Access Token
        //     .addCase(findCurrentUserByAccessToken.pending, (state) => {
        //         state.isLoading = true;
        //         state.error = '';
        //     })
        //     .addCase(findCurrentUserByAccessToken.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.currentUser = action.payload.content;
        //     })
        //     .addCase(findCurrentUserByAccessToken.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = (action.payload as AxiosError)
        //             ? (action.payload as AxiosError).message
        //             : action.error.message!;
        //         toast.error(state.error);
        //     })
        //     // Logout User
        //     .addCase(logoutUser.pending, (state) => {
        //         state.isLoading = true;
        //         state.error = '';
        //     })
        //     .addCase(logoutUser.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         toast.success(action.payload.message);
        //         state.currentUser = null as any;
        //         sessionStorage.clear();
        //     })
        //     .addCase(logoutUser.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = action.error.message!;
        //         toast.error(state.error);
        //     });
    },
});

const authReducer = authSlice.reducer;

export const { resetRegisterMessage } = authSlice.actions;

export default authReducer;
