import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderOnlyLayout, MainLayout } from '../layouts';
import { Following, Home } from '../pages';
import routes from './routes';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<MainLayout />}>
                    <Route path={`${routes.home}`} element={<Home />} />
                    <Route path={`${routes.following}`} element={<Following />} />
                </Route>
                <Route path={`/${routes.upload}`} element={<HeaderOnlyLayout />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
