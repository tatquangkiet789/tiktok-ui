import { ROUTES } from 'constants/api';
import { ROLES } from 'constants/constants';
import RequiredAuth from 'guards/RequiredAuth';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import MainLayout from 'layouts/MainLayout/MainLayout';
import NoLayout from 'layouts/NoLayout/NoLayout';
import Friend from 'pages/Friend/Friend';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import PostDetail from 'pages/PostDetail/PostDetail';
import Register from 'pages/Register/Register';
import UserDetail from 'pages/UserDetail/UserDetail';
import Watch from 'pages/Watch/Watch';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes: FC = () => {
    const publicRoutes = [
        // MAIN LAYOUT
        { path: ROUTES.home, component: Home, layout: MainLayout },
        { path: ROUTES.friends, component: Friend, layout: MainLayout },
        { path: ROUTES.watch, component: Watch, layout: MainLayout },
        { path: ROUTES.userDetail, component: UserDetail, layout: MainLayout },
        // AUTH LAYOUT
        { path: ROUTES.login, component: Login, layout: AuthLayout },
        { path: ROUTES.register, component: Register, layout: AuthLayout },
        // NO LAYOUT
        { path: ROUTES.postDetail, component: PostDetail, layout: NoLayout },
    ];

    // const privateRoutes = [
    //     {
    //         path: ROUTES.postDetail,
    //         component: PostDetailPage,
    //         layout: NoLayout,
    //         allowRoles: [ROLES.USER, ROLES.ADMIN],
    //     },
    //     {
    //         path: routes.messages,
    //         component: MessagePage,
    //         layout: HeaderOnlyLayout,
    //         allowRoles: [ROLES.USER, ROLES.ADMIN],
    //     },
    // ];

    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                {publicRoutes.map(({ path, component, layout }) => {
                    const Page = component;
                    const Layout = layout;
                    return (
                        <Route key={path} element={<Layout />}>
                            <Route path={path} element={<Page />} />
                        </Route>
                    );
                })}

                {/* PRIVATE ROUTES */}
                <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
