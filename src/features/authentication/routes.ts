import React from 'react';

const LoginPage = React.lazy(() => import('./layouts/pages/LoginPage/LoginPage'));

const AuthLayot = React.lazy(() => import('./layouts/AuthLayout'));

const authRoutes = [
    { path: 'feature/auth/login', component: LoginPage, layout: AuthLayot },
];

export default authRoutes;
