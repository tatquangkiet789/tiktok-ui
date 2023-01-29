import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IPost } from 'models/post';
import { toast } from 'react-toastify';

interface IPostState {
    postLoading: boolean;
    posts: IPost[];
    selectedPost: IPost;
    postError: string;
    hasNextPage: boolean;
    message: string;
}

const initialState: IPostState = {
    postLoading: true,
    posts: [],
    selectedPost: null as any,
    postError: '',
    hasNextPage: false,
    message: '',
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
export const findPostById = createAsyncThunk(
    'findPostById',
    async (id: number): Promise<IPost> => {
        const { data } = await axiosClient.get(ENDPOINTS.findPostById(id));
        return data.content;
    },
);

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
export const unlikePostById = createAsyncThunk(
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
        userLikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: IPost) => {
                if (post.id === action.payload)
                    return { ...post, totalLikes: post.totalLikes + 1 };
                return post;
            });
        },
        userUnlikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: IPost) => {
                if (post.id === action.payload)
                    return { ...post, totalLikes: post.totalLikes - 1 };
                return post;
            });
        },
        userAddNewComment: (state) => {
            state.selectedPost.totalComments = state.selectedPost.totalComments + 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Posts
            .addCase(findAllPosts.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
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
                state.postError = action.error.message!;

                toast.error(state.postError);
            })
            .addCase(findAllPostsByCurrentUserId.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
            })
            .addCase(findAllPostsByCurrentUserId.fulfilled, (state, action) => {
                state.postLoading = false;
                state.posts = action.payload.content;
                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsByCurrentUserId.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = action.error.message!;

                toast.error(state.postError);
            })
            // Find Post By Id
            .addCase(findPostById.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
            })
            .addCase(findPostById.fulfilled, (state, action) => {
                state.postLoading = false;

                state.selectedPost = action.payload;
            })
            .addCase(findPostById.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = action.error.message!;

                toast.error(state.postError);
            })
            // Like Post By Id
            .addCase(likePostById.pending, (state) => {})
            .addCase(likePostById.fulfilled, (state, action) => {
                state.message = action.payload.message;
                toast.success(state.message);
            })
            .addCase(likePostById.rejected, (state, action) => {
                state.postError = action.error.message!;

                toast.error(state.postError);
            })
            // Unlike Post By Id
            .addCase(unlikePostById.pending, (state) => {})
            .addCase(unlikePostById.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(unlikePostById.rejected, (state, action) => {
                state.postError = action.error.message!;

                toast.error(state.postError);
            });
    },
});

export const { userLikePost, userUnlikePost, userAddNewComment } = postSlice.actions;

export default postSlice.reducer;
