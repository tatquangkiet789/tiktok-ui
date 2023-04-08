import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
    ICreateNewPostDTO,
    IPostDTO,
    IUserLikeOrUnlikePostDTO,
} from 'components/PostList/models/postDTO';
import {
    createNewPostService,
    findAllPostsAreVideoService,
    findAllPostsByCurrentUserIdService,
    findAllPostsService,
    findPostByIdService,
    likePostByIdService,
    unlikePostByIdService,
} from 'components/PostList/services/postService';
import { IPost } from 'models/post';
import { toast } from 'react-toastify';

interface IPostState {
    postLoading: boolean;
    posts: IPost[];
    selectedPost: IPost;
    postError: string;
    hasNextPage: boolean;
    message: string;
    isNewPostList: boolean;
}

const initialState: IPostState = {
    postLoading: true,
    posts: [],
    selectedPost: null as any,
    postError: '',
    hasNextPage: false,
    message: '',
    isNewPostList: true,
};

// [GET] /api/v1/posts?page=:page OR /api/v1/posts?page=:page&username=:username
export const findAllPosts = createAsyncThunk(
    'findAllPosts',
    async (params: IPostDTO, { rejectWithValue }) => {
        try {
            const data = await findAllPostsService(params);
            return data;
        } catch (error) {
            const err = error as AxiosError;
            if (!err.response) throw err;
            return rejectWithValue(err.response.data);
        }
    },
);

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserId = createAsyncThunk(
    'findAllPostsByCurrentUserId',
    async (params: IPostDTO, { rejectWithValue }) => {
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
    async (params: IUserLikeOrUnlikePostDTO, { rejectWithValue }) => {
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
    async (params: IUserLikeOrUnlikePostDTO, { rejectWithValue }) => {
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
    async (params: ICreateNewPostDTO, { rejectWithValue }) => {
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
    async (params: IPostDTO, { rejectWithValue }) => {
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
        updateNewPostList: (state, action: PayloadAction<boolean>) => {
            state.isNewPostList = action.payload;
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
                if (state.isNewPostList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            })
            .addCase(findAllPostsByCurrentUserId.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
            })
            .addCase(findAllPostsByCurrentUserId.fulfilled, (state, action) => {
                state.postLoading = false;
                if (state.isNewPostList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsByCurrentUserId.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            })
            // Find Post By Id
            .addCase(findPostById.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
            })
            .addCase(findPostById.fulfilled, (state, action) => {
                state.postLoading = false;
                state.selectedPost = action.payload.content;
            })
            .addCase(findPostById.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            })
            // Like Post By Id
            .addCase(likePostById.pending, (state) => {})
            .addCase(likePostById.fulfilled, (state, action) => {
                state.message = action.payload.message;
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
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            })
            // Create New Post
            .addCase(createNewPost.pending, (state) => {
                state.postLoading = true;
            })
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.message = action.payload.message;
                state.posts = [{ ...action.payload.content }, ...state.posts];
                toast.success(state.message);
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            })
            // Find All Posts Are Video
            .addCase(findAllPostsAreVideo.pending, (state) => {
                state.postLoading = true;
                state.postError = '';
            })
            .addCase(findAllPostsAreVideo.fulfilled, (state, action) => {
                state.postLoading = false;
                if (state.isNewPostList) state.posts = action.payload.content;
                else state.posts = [...state.posts, ...action.payload.content];

                state.hasNextPage = Boolean(action.payload.content.length);
            })
            .addCase(findAllPostsAreVideo.rejected, (state, action) => {
                state.postLoading = false;
                state.postError = (action.payload as AxiosError)
                    ? (action.payload as AxiosError).message
                    : action.error.message!;
                toast.error(state.postError);
            });
    },
});

export const { userLikePost, userUnlikePost, userAddNewComment, updateNewPostList } =
    postSlice.actions;

export default postSlice.reducer;
