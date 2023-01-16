import { IUser } from './user';
import { IUserLikePost } from './userLikePost';

export interface IPost {
    // id?: number;
    // caption: string;
    // postUrl?: string;
    // userDetail: IUser;
    // likes: number;
    // shares?: number;
    // active: boolean;
    // postTypeId: number;
    // likeDetailList?: ILike[];
    // comments: number;
    id: number;
    postTypeId: number;
    caption: string;
    postUrl: string;
    totalLikes: number;
    totalComments: number;
    userPostDetail: IUser;
    userLikePostList: IUserLikePost[];
}
