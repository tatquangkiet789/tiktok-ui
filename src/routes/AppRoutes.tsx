import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import UserList from '../pages/UserList';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='users' element={<UserList />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
