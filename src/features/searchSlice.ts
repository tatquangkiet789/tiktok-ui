import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { searchByName } from '../services/searchService';

interface SearchState {
    users: User[];
    loading: boolean;
    error: string;
}

const initialState: SearchState = {
    users: [],
    loading: false,
    error: '',
};

export const searchUserByName = createAsyncThunk(
    'search/seachByName',
    async (keyword: string) => {
        const response = await searchByName(keyword);
        return response;
    },
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder
        //     .addCase(searchUserByName.pending, (state) => {
        //         state.loading = true;
        //         state.users = [];
        //         state.error = '';
        //     })
        //     .addCase(searchUserByName.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.users = action.payload;
        //         state.error = '';
        //     })
        //     .addCase(searchUserByName.rejected, (state, action) => {
        //         state.loading = false;
        //         state.users = [];
        //         state.error = action.error.message!;
        //     });
    },
});

export default searchSlice.reducer;
