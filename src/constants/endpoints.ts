const ENDPOINTS = {
    // Authentication endpoints
    login: '/v1/auth/login',

    // Users endpoints
    findTop10SuggestedUsers: '/v1/users/suggested',

    // Search endpoints
    searchUsersByKeyword: (keyword: string) =>
        `/v1/search?q=${encodeURIComponent(keyword)}`,

    // Posts endpoints
    findAllPosts: '/v1/posts',
};

export default ENDPOINTS;
