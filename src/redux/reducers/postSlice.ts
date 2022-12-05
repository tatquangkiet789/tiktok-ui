import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ENDPOINTS from '../../constants/endpoints';
import axiosClient from '../../libs/axiosClient';
import { IPost } from '../../models/post';

interface IPostState {
    loading: boolean;
    posts: IPost[];
    error: string;
}

const initialState: IPostState = {
    loading: false,
    posts: [],
    error: '',
};

// [GET] /api/v1/posts
export const findAllPosts = createAsyncThunk('findAllPosts', async () => {
    const response = await axiosClient.get(ENDPOINTS.findAllPosts);
    return response.data;
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAllPosts.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(findAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.content;
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            });
    },
});

export default postSlice.reducer;
