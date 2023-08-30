export const API_URL = process.env.REACT_APP_API_URL;

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ENDPOINTS = {
    // Authentication endpoints
    login: '/auth/login',
    register: '/auth/register',
    findCurrentUserByAccessToken: '/users/current-user',
    refreshToken: '/auth/refresh-token',
    logout: '/auth/logout',

    // Users endpoints
    findTop10SuggestedUsers: '/users/suggested',
    findAllFriends: '/users/friends',
    findAllUsersByKeyword: (keyword: string) =>
        `/users/search?q=${encodeURIComponent(keyword)}`,

    // Message endpoints
    findAllMessagesByUserId: (userId: number) => `/messages/${userId}`,
    createNewMessage: '/messages/create',

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
    findAllPostsFromFriends: (page: number) => `/posts/friends?page=${page}`,
    // Comments endpoints
    findAllCommentsByPostId: (postId: number) => `/posts/${postId}/comments`,
    createNewComment: (postId: number) => `/posts/${postId}/comments/create`,
};

export const ROUTES = {
    // MainLayout
    home: '/',
    friends: '/friends',
    watch: '/watch',
    userDetail: '/:username',

    // HeaderOnlyLayout
    messages: '/messages',
    upload: '/upload',

    // AuthLayout
    login: '/auth/login',
    register: '/auth/register',

    // Don't have layout
    postDetail: '/posts/:id',
    unauthorized: '/unauthorized',
};
