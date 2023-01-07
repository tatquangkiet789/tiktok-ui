import { IUser } from './user';

export interface IComment {
    id?: number;
    content: string;
    postId: number;
    likes: number;
    parentId?: number;
    createdDate: Date;
    deletedDate?: Date;
    userDetail: IUser;
}
