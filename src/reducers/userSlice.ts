import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import axiosClient from '../utils/axiosClient';

interface IUserState {
    loading: boolean;
    users: User[];
    error: string;
}

const initialState: IUserState = {
    loading: false,
    users: [],
    error: '',
};

export const findTop10SuggestedUsers = createAsyncThunk(
    'findTop10SuggestedUsers',
    async () => {
        const response = await axiosClient.get('/v1/users/suggested');
        return response.data;
    },
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findTop10SuggestedUsers.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findTop10SuggestedUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.content;
            })
            .addCase(findTop10SuggestedUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            });
    },
});

export default userSlice.reducer;
