export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    isVerified: boolean;
    userRole: string;
};

export interface IUserLikePost {
    id: number;
    likeStatus: boolean;
}
