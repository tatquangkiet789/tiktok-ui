import NoLayout from 'layouts/NoLayout/NoLayout';
import PostDetailPage from 'layouts/NoLayout/pages/PostDetailPage/PostDetailPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequiredAuth from './RequiredAuth';
import { privateRoutes, publicRoutes } from './routes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<h1>Loading components...</h1>}>
                <Routes>
                    {/* Public Routes */}
                    {publicRoutes.map(({ path, component, layout }, index) => {
                        const Page = component;
                        const Layout = layout;

                        return (
                            <Route key={index} element={<Layout />}>
                                <Route path={path} element={<Page />} />
                            </Route>
                        );
                    })}

                    {/* Private Routes */}
                    {privateRoutes.map(
                        ({ path, component, layout, allowRoles }, index) => {
                            const Page = component;
                            const Layout = layout;

                            return (
                                <Route
                                    key={index}
                                    element={<RequiredAuth allowedRoles={allowRoles} />}
                                >
                                    <Route element={<Layout />}>
                                        <Route path={path} element={<Page />} />
                                    </Route>
                                </Route>
                            );
                        },
                    )}
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    );
};

export default AppRoutes;
