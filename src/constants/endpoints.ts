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
    findAllPosts: (page: number) => `/v1/posts?page=${page}`,
    findPostById: (id: number) => `/v1/posts/${id}`,
    likePostById: (id: number) => `/v1/posts/${id}/like`,
    unLikePostById: (id: number) => `/v1/posts/${id}/unlike`,
};

export default ENDPOINTS;
