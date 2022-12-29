import { ROLES } from 'constants/constants';
import routes from 'constants/routes';
import { lazy } from 'react';

// Layouts
const MainLayout = lazy(() => import('layouts/MainLayout/MainLayout'));
const AuthLayout = lazy(() => import('layouts/AuthLayout/AuthLayout'));
const HeaderOnlyLayout = lazy(() => import('layouts/HeaderOnlyLayout/HeaderOnlyLayout'));
const NoLayout = lazy(() => import('layouts/NoLayout/NoLayout'));

// Pages
const HomePage = lazy(() => import('layouts/MainLayout/pages/HomePage/HomePage'));
const FriendPage = lazy(() => import('layouts/MainLayout/pages/FriendPage/FriendPage'));
const WatchPage = lazy(() => import('layouts/MainLayout/pages/WatchPage/WatchPage'));

const LoginPage = lazy(() => import('layouts/AuthLayout/pages/LoginPage/LoginPage'));
const RegisterPage = lazy(
    () => import('layouts/AuthLayout/pages/RegisterPage/RegisterPage'),
);

const MessagePage = lazy(
    () => import('layouts/HeaderOnlyLayout/pages/MessagePage/MessagePage'),
);

const PostDetailPage = lazy(
    () => import('layouts/NoLayout/pages/PostDetailPage/PostDetailPage'),
);
const UnauthorizedPage = lazy(
    () => import('layouts/NoLayout/pages/UnauthorizedPage/UnauthorizedPage'),
);

const publicRoutes = [
    { path: routes.home, component: HomePage, layout: MainLayout },
    { path: routes.friends, component: FriendPage, layout: MainLayout },
    { path: routes.watch, component: WatchPage, layout: MainLayout },

    { path: routes.login, component: LoginPage, layout: AuthLayout },
    { path: routes.register, component: RegisterPage, layout: AuthLayout },

    { path: routes.unauthorized, component: UnauthorizedPage, layout: NoLayout },
];

const privateRoutes = [
    {
        path: routes.messages,
        component: MessagePage,
        layout: HeaderOnlyLayout,
        allowRoles: [ROLES.USER, ROLES.ADMIN],
    },
    {
        path: routes.postDetail,
        component: PostDetailPage,
        layout: NoLayout,
        allowRoles: [ROLES.USER, ROLES.ADMIN],
    },
];

export { publicRoutes, privateRoutes };
