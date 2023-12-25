import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Post } from 'features/posts/models/post';
import {
    IPost,
    IFindPost,
    IUserLikeOrUnlikePost,
    INewPost,
} from 'features/posts/models/postModel';
import {
    findAllPostsService,
    findAllPostsByCurrentUserIdService,
    findPostByIdService,
    likePostByIdService,
    unlikePostByIdService,
    createNewPostService,
    findAllPostsAreVideoService,
    findAllPostsFromFriendsService,
} from 'features/posts/services/postService';
import { findAllPosts } from 'features/posts/services/postThunk';
import { toast } from 'react-toastify';

type PostState = {
    isLoading: boolean;
    posts: Post[];
    selectedPost: IPost;
    error: string;
    isLastPage: boolean;
    message: string;
    isNewPostList: boolean;
};

const initialState: PostState = {
    isLoading: true,
    posts: [],
    selectedPost: null as any,
    error: '',
    isLastPage: false,
    message: '',
    isNewPostList: true,
};

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserId = createAsyncThunk(
    'findAllPostsByCurrentUserId',
    async (params: IFindPost, { rejectWithValue }) => {
        try {
            const data = await findAllPostsByCurrentUserIdService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /api/v1/posts/:id
export const findPostById = createAsyncThunk(
    'findPostById',
    async (id: number, { rejectWithValue }) => {
        try {
            const data = await findPostByIdService(id);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/posts/:id/like
export const likePostById = createAsyncThunk(
    'likePostById',
    async (params: IUserLikeOrUnlikePost, { rejectWithValue }) => {
        try {
            const data = await likePostByIdService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/posts/:id/unlike
export const unlikePostById = createAsyncThunk(
    'unLikePostById',
    async (params: IUserLikeOrUnlikePost, { rejectWithValue }) => {
        try {
            const data = await unlikePostByIdService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [POST] /api/v1/posts/create
export const createNewPost = createAsyncThunk(
    'createNewPost',
    async (params: INewPost, { rejectWithValue }) => {
        try {
            const data = await createNewPostService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /api/v1/posts/video?page=:page
export const findAllPostsAreVideo = createAsyncThunk(
    'findAllPostsAreVideo',
    async (params: IFindPost, { rejectWithValue }) => {
        try {
            const data = await findAllPostsAreVideoService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /api/v1/posts/friends?page=:page
export const findAllPostsFromFriends = createAsyncThunk(
    'findAllPostsFromFriends',
    async (params: IFindPost, { rejectWithValue }) => {
        try {
            const data = await findAllPostsFromFriendsService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        userLikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: Post) => {
                if (post.id === action.payload)
                    return { ...post, totalLikes: post.totalLikes + 1 };
                return post;
            });
        },
        userUnlikePost: (state, action: PayloadAction<number>) => {
            state.posts = state.posts.map((post: Post) => {
                if (post.id === action.payload)
                    return { ...post, totalLikes: post.totalLikes - 1 };
                return post;
            });
        },
        userAddNewComment: (state) => {
            state.selectedPost.totalComments = state.selectedPost.totalComments + 1;
        },
        updateNewPostList: (state, action: PayloadAction<boolean>) => {
            state.isNewPostList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Find All Posts
            .addCase(findAllPosts.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(findAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLastPage = action.payload.isLastPage;
                state.posts = action.payload.content;
                // if (state.isNewPostList) state.posts = action.payload.content;
                // else state.posts = [...state.posts, ...action.payload.content];

                // state.isLastPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.error);
            });
        // .addCase(findAllPostsByCurrentUserId.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsByCurrentUserId.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsByCurrentUserId.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find Post By Id
        // .addCase(findPostById.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findPostById.fulfilled, (state, action) => {
        //     state.selectedPost = action.payload.content;
        //     state.isLoading = false;
        // })
        // .addCase(findPostById.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Like Post By Id
        // .addCase(likePostById.pending, (state) => {})
        // .addCase(likePostById.fulfilled, (state, action) => {
        //     state.message = action.payload.message;
        // })
        // .addCase(likePostById.rejected, (state, action) => {
        //     state.error = action.error.message!;
        //     toast.error(state.error);
        // })
        // // Unlike Post By Id
        // .addCase(unlikePostById.pending, (state) => {})
        // .addCase(unlikePostById.fulfilled, (state, action) => {
        //     state.message = action.payload.message;
        // })
        // .addCase(unlikePostById.rejected, (state, action) => {
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Create New Post
        // .addCase(createNewPost.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(createNewPost.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.message = action.payload.message;
        //     state.posts = [{ ...action.payload.content }, ...state.posts];
        //     toast.success(state.message);
        // })
        // .addCase(createNewPost.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find All Posts Are Video
        // .addCase(findAllPostsAreVideo.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsAreVideo.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsAreVideo.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // })
        // // Find All Posts From Friends
        // .addCase(findAllPostsFromFriends.pending, (state) => {
        //     state.isLoading = true;
        //     state.error = '';
        // })
        // .addCase(findAllPostsFromFriends.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     if (state.isNewPostList) state.posts = action.payload.content;
        //     else state.posts = [...state.posts, ...action.payload.content];

        //     state.isLastPage = Boolean(action.payload.content.length);
        // })
        // .addCase(findAllPostsFromFriends.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = (action.payload as AxiosError)
        //         ? (action.payload as AxiosError).message
        //         : action.error.message!;
        //     toast.error(state.error);
        // });
    },
});

export const { userLikePost, userUnlikePost, userAddNewComment, updateNewPostList } =
    postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
