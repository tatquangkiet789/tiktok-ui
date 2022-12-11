export interface IComment {
    id?: number;
    content: string;
    postId: number;
    userId: number;
    likes: number;
    replyId: number;
    createdDate: Date;
    deletedDate?: Date;
}
