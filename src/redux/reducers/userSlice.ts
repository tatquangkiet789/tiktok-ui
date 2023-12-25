import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from 'features/users/models/user';
import { findTop10SuggestedUsers } from 'features/users/services/userThunk';

type UserState = {
    isLoading: boolean;
    users: User[];
    error: string;
    searchResult: User[];
};

const initialState: UserState = {
    isLoading: true,
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
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findTop10SuggestedUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.content;
            })
            .addCase(findTop10SuggestedUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
            });
    },
});

const userReducer = userSlice.reducer;

export default userReducer;
