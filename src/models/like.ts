export interface ILike {
    id?: number;
    postId: number;
    userLikeId: number;
    like: boolean;
    createdDate?: Date;
    deletedDate?: Date;
}
