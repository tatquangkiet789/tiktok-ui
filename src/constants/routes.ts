const routes = {
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

export default routes;
