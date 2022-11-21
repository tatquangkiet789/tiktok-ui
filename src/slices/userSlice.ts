import { createSlice } from '@reduxjs/toolkit';
import { USERS } from '../constants/constants';
import { User } from '../models/user';

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: USERS,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        showAllSuggestedUsers: (state) => {
            state.users = USERS;
        },
        showLessSuggestedUser: (state) => {
            state.users = state.users.slice(0, 4);
        },
    },
    extraReducers: (builder) => {},
});

export const { showAllSuggestedUsers, showLessSuggestedUser } = userSlice.actions;

export default userSlice.reducer;
