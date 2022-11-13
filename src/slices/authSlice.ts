import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    currentUser: boolean;
}

const initialState: AuthState = {
    currentUser: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.currentUser = true;
        },
        logout: (state) => {
            state.currentUser = false;
        },
    },
    extraReducers: (builder) => {},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
