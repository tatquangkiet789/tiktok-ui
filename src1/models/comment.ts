import { IUser } from './user';

export interface IComment {
    id: number;
    content: string;
    parentId: number;
    createdDate: Date;
    userCommentDetail: IUser;
}

export interface IFindComment {
    postId: number;
}

export interface INewComment {
    postId: number;
    parentId?: number;
    content: string;
    accessToken: string;
}
