import { ENDPOINTS } from 'constants/api';
import { privateAxios, publicAxios } from 'lib/axiosClient';
import { IFindPost, INewPost, IUserLikeOrUnlikePost } from '../models/postModel';

// [GET] /api/v1/posts?page=:page
// [GET] /api/v1/posts?page=:page&username=:username
export const findAllPostsService = async (params: IFindPost) => {
    const { page, username } = params;
    const res = await publicAxios.get(ENDPOINTS.findAllPosts(page!, username));
    return res.data;
};

// [GET] /api/v1/posts/video?page=:page
export const findAllPostsAreVideoService = async (params: IFindPost) => {
    const { page } = params;
    const res = await publicAxios.get(ENDPOINTS.findAllPostsAreVideo(page!));
    return res.data;
};

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserIdService = async (params: IFindPost) => {
    const { page, accessToken } = params;
    const res = await privateAxios.get(ENDPOINTS.findAllPostsByCurrentUserId(page!), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [GET] /api/v1/posts/:id
export const findPostByIdService = async (id: number) => {
    const res = await publicAxios.get(ENDPOINTS.findPostById(id));
    return res.data;
};

// [POST] /api/v1/posts/:id/like
export const likePostByIdService = async (params: IUserLikeOrUnlikePost) => {
    const { postId, accessToken } = params;
    const res = await privateAxios.get(ENDPOINTS.likePostById(postId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/posts/:id/unlike
export const unlikePostByIdService = async (params: IUserLikeOrUnlikePost) => {
    const { postId, accessToken } = params;
    const res = await privateAxios.get(ENDPOINTS.unLikePostById(postId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/posts/create
export const createNewPostService = async (value: INewPost) => {
    const { formData, accessToken } = value;
    const res = await privateAxios.post(ENDPOINTS.createNewPost, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [GET] /api/v1/posts/friends?page=:page
export const findAllPostsFromFriendsService = async (params: IFindPost) => {
    const { page, accessToken } = params;
    const res = await privateAxios.get(ENDPOINTS.findAllPostsFromFriends(page!), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};
