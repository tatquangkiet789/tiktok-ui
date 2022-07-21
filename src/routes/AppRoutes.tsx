import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderOnlyLayout from '../layouts/HeaderOnlyLayout';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import routes from './routes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<MainLayout />}>
                    <Route path={`${routes.home}`} element={<Home />} />
                    <Route path={`${routes.following}`} element={<Home />} />
                </Route>
                <Route path={`/${routes.upload}`} element={<HeaderOnlyLayout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
