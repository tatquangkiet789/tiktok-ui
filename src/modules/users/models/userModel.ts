export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    tick: boolean;
}

export interface IUserLikePost {
    id: number;
    likeStatus: boolean;
}
