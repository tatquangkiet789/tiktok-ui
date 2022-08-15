import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';

//Layouts
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const HeaderOnlyLayout = React.lazy(() => import('../layouts/HeaderOnlyLayout'));

//Pages
const Home = React.lazy(() => import('../pages/Home'));
const Following = React.lazy(() => import('../pages/Following'));

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={`/`}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <MainLayout />
                        </React.Suspense>
                    }
                >
                    <Route
                        path={`${routes.home}`}
                        element={
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Home />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path={`${routes.following}`}
                        element={
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Following />
                            </React.Suspense>
                        }
                    />
                </Route>
                {/* End of MainLayout route */}
                <Route
                    path={`/${routes.upload}`}
                    element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <HeaderOnlyLayout />
                        </React.Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
