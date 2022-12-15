import { IComment } from './comment';
import { ILike } from './like';
import { IUser } from './user';

export interface IPost {
    id?: number;
    caption: string;
    postUrl?: string;
    userDetail: IUser;
    likes: number;
    shares?: number;
    active: boolean;
    postTypeId: number;
    comments: IComment[];
    likeDetailList?: ILike[];
}