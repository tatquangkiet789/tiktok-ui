import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import axiosClient from '../lib/axiosClient';

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

// Workaround: cast state instead of declaring variable type
// const initialState = {
//     users: [],
//     loading: false,
//     error: '',
// } as UserState

// First, create the thunk
export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await axiosClient.get('/users');
    return response.data;
});

// Then, handle actions in your reducers:
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;
            });
    },
});

export default userSlice.reducer;
