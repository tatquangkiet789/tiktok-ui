import { ROUTES } from 'constants/api';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.home} element={<MainLayout />}>
                    <Route path={ROUTES.home} element={<Home />} />
                </Route>

                <Route path={ROUTES.auth} element={<AuthLayout />}>
                    <Route path={ROUTES.login} element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
