export interface IPostDTO {
    postId?: number;
    page: number;
    username?: string;
    accessToken?: string;
}

export interface IUserLikeOrUnlikePostDTO {
    postId: number;
    accessToken: string;
}

export interface ICreateNewPostDTO {
    formData: FormData;
    accessToken: string;
}
