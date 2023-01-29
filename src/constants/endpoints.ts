const ENDPOINTS = {
    // Authentication endpoints
    login: '/v1/auth/login',
    register: 'v1/auth/register',

    // Users endpoints
    findTop10SuggestedUsers: '/v1/users/suggested',

    // Search endpoints
    searchUsersByKeyword: (keyword: string) =>
        `/v1/search?q=${encodeURIComponent(keyword)}`,

    // Posts endpoints
    findAllPosts: (page: number, username?: string) =>
        `/v1/posts?page=${page}${username ? `&username=${username}` : ''}`,
    findPostById: (id: number) => `/v1/posts/${id}`,
    likePostById: (id: number) => `/v1/posts/${id}/like`,
    unLikePostById: (id: number) => `/v1/posts/${id}/unlike`,
    findAllPostsByCurrentUserId: (page: number) => `/v1/posts/user?page=${page}`,
    createNewPost: '/v1/posts/create',

    // Comments endpoints
    findAllCommentsByPostId: (postId: number) => `/v1/posts/${postId}/comments`,
    createNewComment: (postId: number) => `/v1/posts/${postId}/comments/create`,
};

export default ENDPOINTS;
