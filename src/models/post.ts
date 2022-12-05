import { IUser } from './user';

export interface IPost {
    id?: number;
    caption: string;
    postUrl?: string;
    users: IUser;
    likes: number;
    shares?: number;
    active: boolean;
    postTypeId: number;
}
