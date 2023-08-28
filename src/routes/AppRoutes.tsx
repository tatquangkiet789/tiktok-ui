import { ROUTES } from 'constants/api';
import { ROLES } from 'constants/constants';
import RequiredAuth from 'guards/RequiredAuth';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import MainLayout from 'layouts/MainLayout/MainLayout';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Watch from 'pages/Watch/Watch';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path={ROUTES.home} element={<MainLayout />}>
                    <Route path={ROUTES.home} element={<Home />} />
                    <Route path={ROUTES.watch} element={<Watch />} />
                </Route>
                <Route path={ROUTES.auth} element={<AuthLayout />}>
                    <Route path={ROUTES.login} element={<Login />} />
                </Route>

                {/* PRIVATE ROUTES */}
                <Route element={<RequiredAuth allowedRoles={[ROLES.USER]} />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
