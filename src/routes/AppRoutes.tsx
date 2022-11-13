import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home';
import routes from './routes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* MainLayout */}
                <Route path={`/`} element={<MainLayout />}>
                    <Route path={`${routes.home}`} element={<Home />} />
                </Route>
                {/* End of MainLayout route */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
