import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../utils/axiosClient';

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

// [GET] /api/v1/search?keyword=:keyword
export const searchUsersByKeyword = createAsyncThunk(
    'searchUsersByKeyword',
    async (keyword: string) => {
        const response = await axiosClient.get(
            `/v1/search?keyword=${encodeURIComponent(keyword)}`,
        );
        return response.data;
    },
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
