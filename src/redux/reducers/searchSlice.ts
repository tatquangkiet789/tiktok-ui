import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';

interface ISearchState {
    result: any[];
    loading: boolean;
    erorr: string;
}

const initialState: ISearchState = {
    result: [],
    loading: false,
    erorr: '',
};

// [GET] /api/v1/search/all?q=:keyword
export const searchUsersByKeyword = createAsyncThunk(
    'searchUsersByKeyword',
    async (keyword: string) => {
        const response = await axiosClient.get(ENDPOINTS.searchUsersByKeyword(keyword));
        return response.data;
    },
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Search Users By Keyword
            .addCase(searchUsersByKeyword.pending, (state) => {
                state.loading = true;
                state.erorr = '';
            })
            .addCase(searchUsersByKeyword.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload.content;
            })
            .addCase(searchUsersByKeyword.rejected, (state, action) => {
                state.loading = false;
                state.erorr = action.error.message!;
            });
    },
});

export default searchSlice.reducer;