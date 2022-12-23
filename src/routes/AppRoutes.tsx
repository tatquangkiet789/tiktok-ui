import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import LoginPage from 'layouts/AuthLayout/pages/LoginPage/LoginPage';
import RegisterPage from 'layouts/AuthLayout/pages/RegisterPage/RegisterPage';
import HeaderOnlyLayout from 'layouts/HeaderOnlyLayout/HeaderOnlyLayout';
import MessagePage from 'layouts/HeaderOnlyLayout/pages/MessagePage/MessagePage';
import MainLayout from 'layouts/MainLayout/MainLayout';
import FriendPage from 'layouts/MainLayout/pages/FriendPage/FriendPage';
import HomePage from 'layouts/MainLayout/pages/HomePage/HomePage';
import WatchPage from 'layouts/MainLayout/pages/WatchPage/WatchPage';
import PostDetailPage from 'layouts/pages/PostDetailPage/PostDetailPage';
import UnauthorizedPage from 'layouts/pages/UnauthorizedPage/UnauthorizedPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

import { testing } from './routes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<h1>Loading...</h1>}>
                <Routes>
                    {/* MainLayout */}
                    <Route path={routes.home} element={<MainLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path={routes.friends} element={<FriendPage />} />
                        <Route path={routes.watch} element={<WatchPage />} />
                    </Route>
                    {/* End Of MainLayout Routes */}

                    {/* HeaderOnlyLayout */}
                    <Route path={routes.home} element={<HeaderOnlyLayout />}>
                        <Route path={routes.messages} element={<MessagePage />} />
                    </Route>
                    {/* End Of HeaderOnlyLayout Routes */}

                    {/* Doesn't Use Layout */}
                    <Route
                        path='@:username/post/:id'
                        element={<PostDetailPage />}
                    ></Route>
                    <Route path={routes.unauthorized} element={<UnauthorizedPage />} />
                    {/* End Of Doesn't Use Layout */}

                    {/* AuthLayout Routes */}
                    <Route path={routes.auth} element={<AuthLayout />}>
                        <Route path={routes.login} element={<LoginPage />} />
                        <Route path={routes.register} element={<RegisterPage />} />
                    </Route>
                    {/* End Of AuthLayout Routes */}

                    {/* Testing Area */}
                    {testing.map(({ path, component, layout }) => {
                        const Page = component;
                        const Layout = layout;
                        return (
                            <Route element={<Layout />} key={path}>
                                <Route path={path} element={<Page />} />
                            </Route>
                        );
                    })}
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
