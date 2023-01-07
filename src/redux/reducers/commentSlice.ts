import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IComment } from 'models/comment';
import { INewComment } from 'models/newComment';
import { toast } from 'react-toastify';

interface ICommentState {
    commentLoading: boolean;
    comments: IComment[];
    commentError: string;
    commentSubmitLoading: boolean;
    selectedComment: IComment;
}

const initialState: ICommentState = {
    commentLoading: false,
    comments: [],
    commentError: '',
    commentSubmitLoading: false,
    selectedComment: null as any,
};

// [GET] /api/v1/posts/:postId/comments
export const findAllCommentsByPostId = createAsyncThunk(
    'findAllCommentsByPostId',
    async (id: number) => {
        const response = await axiosClient.get(ENDPOINTS.findAllCommentsByPostId(id));
        return response.data;
    },
);

// [POST] /api/v1/posts/:postId/comments/create
export const createNewComment = createAsyncThunk(
    'createNewComment',
    async (data: INewComment) => {
        const { postId, content, accessToken, parentId } = data;
        const response = await axiosClient.post(
            ENDPOINTS.createNewComment(postId),
            { content: content, parentId: parentId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    },
);

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        findSelectedCommentById: (state, action: PayloadAction<number>) => {
            state.selectedComment = state.comments.filter(
                (comment) => comment.id === action.payload,
            )[0];
        },
    },
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
            })
            .addCase(createNewComment.pending, (state) => {
                state.commentSubmitLoading = true;
                state.commentError = '';
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
                state.commentSubmitLoading = false;
                console.log(`Before: ${state.comments.length}`);
                state.comments.push(action.payload.content);
                console.log(`After: ${state.comments.length}`);
            })
            .addCase(createNewComment.rejected, (state, action) => {
                state.commentSubmitLoading = false;
                state.commentError = action.error.message!;

                toast.error(state.commentError);
            });
    },
});

export const { findSelectedCommentById } = commentSlice.actions;

export default commentSlice.reducer;
