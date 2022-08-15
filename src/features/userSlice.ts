import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { getAllUsers } from '../services/userService';

// Define a type for the slice state
interface UserState {
    users: User[];
    loading: boolean;
    error: string;
}

// Define the initial state using that type
const initialState: UserState = {
    users: [],
    loading: false,
    error: '',
};

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await getAllUsers();
    return response;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sliceFiveItems: (state) => {
            state.users.splice(5, state.users.length);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.users = [];
                state.error = '';
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = '';
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.error.message!;
            });
    },
});

export const { sliceFiveItems } = userSlice.actions;

export default userSlice.reducer;
