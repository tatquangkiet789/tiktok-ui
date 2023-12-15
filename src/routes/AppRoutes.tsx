import { ROLES } from 'constants/constants';
import RequiredAuth from 'guards/RequiredAuth';
import MainLayout from 'layouts/MainLayout';
import HomePage from 'pages/HomePage';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { APP_ROUTES } from './routes';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/Register';
import AuthLayout from 'layouts/AuthLayout';

const AppRoutes: FC = () => {
    const publicRoutes = [
        // MAIN LAYOUT
        { path: APP_ROUTES.HOME, component: HomePage, layout: MainLayout },
        // { path: APP_ROUTES.FRIENDS, component: Friend, layout: MainLayout },
        // { path: APP_ROUTES.WATCH, component: Watch, layout: MainLayout },
        // { path: APP_ROUTES.USER_DETAIL, component: UserDetail, layout: MainLayout },
        // // AUTH LAYOUT
        { path: APP_ROUTES.LOGIN, component: LoginPage, layout: AuthLayout },
        { path: APP_ROUTES.REGISTER, component: RegisterPage, layout: AuthLayout },
        // // NO LAYOUT
        // { path: APP_ROUTES.POST_DETAIL, component: PostDetail, layout: NoLayout },
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
                {/* <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
