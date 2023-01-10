import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IPost } from 'models/post';
import { toast } from 'react-toastify';

interface IPostState {
    postLoading: boolean;
    posts: IPost[];
    selectedPost: IPost;
    error: string;
    hasNextPage: boolean;
    message: string;
    updateLikeStatus: boolean;
}

const initialState: IPostState = {
    postLoading: true,
    posts: [],
    selectedPost: null as any,
    error: '',
    hasNextPage: false,
    message: '',
    updateLikeStatus: false,
};

interface IFindPost {
    page: number;
    username?: string;
    accessToken?: string;
}

// [GET] /api/v1/posts?page=:page OR /api/v1/posts?page=:page&username=:username
export const findAllPosts = createAsyncThunk(
    'findAllPosts',
    async (params: IFindPost) => {
        const { page, username } = params;
        const response = await axiosClient.get(ENDPOINTS.findAllPosts(page, username));
        return response.data;
    },
);

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserId = createAsyncThunk(
    'findAllPostsByCurrentUserId',
    async (data: IFindPost) => {
        const { page, accessToken } = data;
        const response = await axiosClient.get(
            ENDPOINTS.findAllPostsByCurrentUserId(page),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    },
);

// [GET] /api/v1/posts/:id
export const findPostByIdAPI = createAsyncThunk('findPostByIdAPI', async (id: number) => {
    const response = await axiosClient.get(ENDPOINTS.findPostById(id));
    return response.data;
});

// [POST] /api/v1/posts/:id/like
export const likePostById = createAsyncThunk(
    'likePostById',
    async ({ id, accessToken }: { id: number; accessToken: string }) => {
        const response = await axiosClient.post(ENDPOINTS.likePostById(id), null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
);

// [POST] /api/v1/posts/:id/unlike
export const unLikePostById = createAsyncThunk(
    'unLikePostById',
    async ({ id, accessToken }: { id: number; accessToken: string }) => {
        const response = await axiosClient.post(ENDPOINTS.unLikePostById(id), null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    },
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        findPostById: (state, action: PayloadAction<number>) => {
            state.selectedPost = state.posts.filter(
                (post) => post.id === action.payload,
            )[0];
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Posts
            .addCase(findAllPosts.pending, (state) => {
                state.postLoading = true;
                state.error = '';
            })
            .addCase(findAllPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                // state.posts = state.posts.concat(action.payload.content)
                // state.posts = [...new Set([...state.posts, ...action.payload.content])];
                state.posts = action.payload.content;
                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            })
            .addCase(findAllPostsByCurrentUserId.pending, (state) => {
                state.postLoading = true;
                state.error = '';
            })
            .addCase(findAllPostsByCurrentUserId.fulfilled, (state, action) => {
                console.log('findAllPostsByCurrentUserId.fulfilled');

                state.postLoading = false;
                state.posts = action.payload.content;
                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsByCurrentUserId.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            })
            // Find Post By Id
            .addCase(findPostByIdAPI.pending, (state) => {
                state.postLoading = true;
                state.error = '';
            })
            .addCase(findPostByIdAPI.fulfilled, (state, action) => {
                state.postLoading = false;
                state.selectedPost = action.payload.content;
            })
            .addCase(findPostByIdAPI.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.error.message!;

                toast.error(state.error);
            })
            // Like Post By Id
            .addCase(likePostById.pending, (state) => {
                state.message = '';
            })
            .addCase(likePostById.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.updateLikeStatus = !state.updateLikeStatus;

                toast.success(state.message);
            })
            .addCase(likePostById.rejected, (state, action) => {
                state.error = action.error.message!;

                toast.error(state.error);
            })
            // Unlike Post By Id
            .addCase(unLikePostById.pending, (state) => {
                state.message = '';
            })
            .addCase(unLikePostById.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.updateLikeStatus = !state.updateLikeStatus;

                toast.success(state.message);
            })
            .addCase(unLikePostById.rejected, (state, action) => {
                state.error = action.error.message!;

                toast.error(state.error);
            });
    },
});

export const { findPostById } = postSlice.actions;

export default postSlice.reducer;
