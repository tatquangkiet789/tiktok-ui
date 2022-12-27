import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IComment } from 'models/comment';
import { toast } from 'react-toastify';

interface CommentState {
    commentLoading: boolean;
    comments: IComment[];
    commentError: string;
}

const initialState: CommentState = {
    commentLoading: true,
    comments: [],
    commentError: '',
};

// [GET] /api/v1/posts/:postId/comments
export const findAllCommentsByPostId = createAsyncThunk(
    'findAllCommentsByPostId',
    async (id: number) => {
        const response = await axiosClient.get(ENDPOINTS.findAllCommentsByPostId(id));
        return response.data;
    },
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findAllCommentsByPostId.pending, (state) => {
                state.commentLoading = true;
                state.commentError = '';
            })
            .addCase(findAllCommentsByPostId.fulfilled, (state, action) => {
                state.commentLoading = false;
                state.comments = action.payload.content;
            })
            .addCase(findAllCommentsByPostId.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = action.error.message!;

                toast.error(state.commentError);
            });
    },
});

export default commentSlice.reducer;
