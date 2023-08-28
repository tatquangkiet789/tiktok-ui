import { IUser, IUserLikePost } from 'modules/user/models/userModel';

export interface IPost {
    id: number;
    postTypeId: number;
    caption: string;
    postUrl: string;
    totalLikes: number;
    totalComments: number;
    userPostDetail: IUser;
    userLikePostList: IUserLikePost[];
    createdDate: Date;
}

// export interface IPostDTO {
//     postId?: number;
//     page: number;
//     username?: string;
//     accessToken?: string;
// }

export interface IUserLikeOrUnlikePost {
    postId: number;
    accessToken: string;
}

export interface INewPost {
    formData: FormData;
    accessToken: string;
}

export interface IFindPost {
    postId?: number;
    page?: number;
    username?: string;
    accessToken?: string;
}
