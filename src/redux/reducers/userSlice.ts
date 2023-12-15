import { createSlice } from '@reduxjs/toolkit';
import { User } from 'features/users/models/userModel';
import { findTop10SuggestedUsers } from 'features/users/services/userThunk';

type UserState = {
    loading: boolean;
    users: User[];
    error: string;
    searchResult: User[];
};

const initialState: UserState = {
    loading: true,
    users: [],
    error: '',
    searchResult: [],
};

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

const userReducer = userSlice.reducer;

export default userReducer;
