import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IUser } from 'models/user';

interface IUserState {
    loading: boolean;
    users: IUser[];
    error: string;
}

const initialState: IUserState = {
    loading: true,
    users: [],
    error: '',
};

// [GET] /api/v1/users/suggested
export const findTop10SuggestedUsers = createAsyncThunk(
    'findTop10SuggestedUsers',
    async () => {
        const response = await axiosClient.get(ENDPOINTS.findTop10SuggestedUsers);
        return response.data;
    },
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Find 10 Suggested Users
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
