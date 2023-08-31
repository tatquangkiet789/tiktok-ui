import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'modules/users/models/userModel';
import { findTop10SuggestedUsersService } from 'modules/users/services/userService';

interface IUserState {
    loading: boolean;
    users: IUser[];
    error: string;
    searchResult: IUser[];
}

const initialState: IUserState = {
    loading: true,
    users: [],
    error: '',
    searchResult: [],
};

// [GET] /api/v1/users/suggested
export const findTop10SuggestedUsers = createAsyncThunk(
    'findTop10SuggestedUsers',
    async (): Promise<IUser[]> => {
        const data = await findTop10SuggestedUsersService();
        return data.content;
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
                state.users = action.payload;
            })
            .addCase(findTop10SuggestedUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            });
    },
});

export default userSlice.reducer;
