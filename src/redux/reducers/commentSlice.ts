import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IComment, IFindComment, INewComment } from 'models/comment';

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

// [GET] /api/v1/posts/:id/comments
export const findAllCommentsByPostId = createAsyncThunk(
    'findAllCommentsByPostId',
    async (value: IFindComment): Promise<IComment[]> => {
        const { postId } = value;
        const { data } = await axiosClient.get(ENDPOINTS.findAllCommentsByPostId(postId));
        return data.content;
    },
);

// [POST] /api/v1/posts/:postId/comments/create
export const createNewComment = createAsyncThunk(
    'createNewComment',
    async (value: INewComment): Promise<IComment> => {
        const { postId, content, accessToken, parentId } = value;
        const { data } = await axiosClient.post(
            ENDPOINTS.createNewComment(postId),
            { content: content, parentId: parentId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return data.content;
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
        resetSelectedComment: (state) => {
            state.selectedComment = null as any;
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
                state.comments = action.payload;
            })
            .addCase(findAllCommentsByPostId.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = action.error.message!;
            })
            .addCase(createNewComment.pending, (state) => {
                state.commentError = '';
            })
            .addCase(createNewComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(createNewComment.rejected, (state, action) => {
                state.commentError = action.error.message!;
            });
    },
});

export const { findSelectedCommentById, resetSelectedComment } = commentSlice.actions;

export default commentSlice.reducer;
