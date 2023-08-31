const ENDPOINTS = {
    // Authentication endpoints
    login: '/auth/login',
    register: '/auth/register',
    findCurrentUserByAccessToken: '/users/current-user',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',

    // Users endpoints
    findTop10SuggestedUsers: '/users/suggested',

    // Friend endpoints
    findAllFriends: '/users/friends',

    // Message endpoints
    findAllMessagesByUserId: (userId: number) => `/messages/${userId}`,
    createNewMessage: '/messages/create',

    // Search endpoints
    searchUsersByKeyword: (keyword: string) => `/search?q=${encodeURIComponent(keyword)}`,

    // Posts endpoints
    findAllPosts: (page: number, username?: string) =>
        `/posts?page=${page}${
            username ? `&username=${encodeURIComponent(username)}` : ''
        }`,
    findPostById: (id: number) => `/posts/${id}`,
    likePostById: (id: number) => `/posts/${id}/like`,
    unLikePostById: (id: number) => `/posts/${id}/unlike`,
    findAllPostsByCurrentUserId: (page: number) => `/posts/user?page=${page}`,
    findAllPostsAreVideo: (page: number) => `/posts/video?page=${page}`,
    createNewPost: '/posts/create',

    // Comments endpoints
    findAllCommentsByPostId: (postId: number) => `/posts/${postId}/comments`,
    createNewComment: (postId: number) => `/posts/${postId}/comments/create`,
};

export default ENDPOINTS;
