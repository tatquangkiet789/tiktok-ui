import { IComment } from './comment';
import { IUser } from './user';
import { IUserLikePost } from './userLikePost';

export interface IPost {
    id: number;
    postTypeId: number;
    caption: string;
    postUrl: string;
    totalLikes: number;
    totalComments: number;
    userPostDetail: IUser;
    userLikePostList: IUserLikePost[];
    commentDetailList: IComment[];
    createdDate: Date;
}
