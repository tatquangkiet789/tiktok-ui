const routes = {
    // MainLayout
    home: '/',
    friends: '/friends',
    watch: '/watch',

    // HeaderOnlyLayout
    messages: '/messages',

    // AuthLayout
    login: '/auth/login',
    register: '/auth/register',

    // Don't have layout
    postDetail: '/post/:id',
    unauthorized: '/unauthorized',
};

export default routes;
