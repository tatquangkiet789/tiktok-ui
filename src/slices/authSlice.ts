import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_USER } from '../constants/constants';
import { User } from '../models/user';

interface IAuthState {
    currentUser: {
        id: number;
        name: string;
        username: string;
        avatar: string;
        tick: boolean;
    };
}

const initialState: IAuthState = {
    currentUser: null as any,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state) => {
            state.currentUser = CURRENT_USER;
        },
        logoutUser: (state) => {
            state.currentUser = null as any;
        },
    },
    extraReducers: (builder) => {},
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
