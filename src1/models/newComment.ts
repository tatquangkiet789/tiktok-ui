export interface INewComment {
    postId: number;
    parentId?: number;
    content: string;
    accessToken: string;
}
