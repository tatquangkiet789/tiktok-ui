import ENDPOINTS from 'constants/endpoints';
import { privateAxios, publicAxios } from 'libs/axiosClient';
import { ICreateNewPostDTO, IPostDTO, IUserLikeOrUnlikePostDTO } from '../models/postDTO';

// [GET] /api/v1/posts?page=:page OR /api/v1/posts?page=:page&username=:username
export const findAllPostsService = async (params: IPostDTO) => {
    const { page, username } = params;
    const res = await publicAxios.get(ENDPOINTS.findAllPosts(page, username));
    return res.data;
};

// [GET] /api/v1/posts/video?page=:page
export const findAllPostsAreVideoService = async (params: IPostDTO) => {
    const { page } = params;
    const res = await publicAxios.get(ENDPOINTS.findAllPostsAreVideo(page));
    return res.data;
};

// [GET] /v1/posts/user?page=:page
export const findAllPostsByCurrentUserIdService = async (params: IPostDTO) => {
    const { page, accessToken } = params;
    const res = await privateAxios.get(ENDPOINTS.findAllPostsByCurrentUserId(page), {
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
export const likePostByIdService = async (params: IUserLikeOrUnlikePostDTO) => {
    const { postId, accessToken } = params;
    console.log(`likePostByIdService: `, params);

    const res = await publicAxios.post(ENDPOINTS.likePostById(postId), null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/posts/:id/unlike
export const unlikePostByIdService = async (params: IUserLikeOrUnlikePostDTO) => {
    const { postId, accessToken } = params;
    const res = await privateAxios.post(ENDPOINTS.unLikePostById(postId), null, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/posts/create
export const createNewPostService = async (value: ICreateNewPostDTO) => {
    const { formData, accessToken } = value;
    const res = await privateAxios.post(ENDPOINTS.createNewPost, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};
