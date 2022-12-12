const routes = {
    home: '/',
    friends: 'friends',
    watch: 'watch',
    feedback: 'feedback',
    upload: 'upload',
    messages: 'messages',
    postDetail: (username: string, id: number) => `@${username}/post/${id}`,

    auth: 'auth',
    login: 'login',
    register: 'register',
};

export default routes;
