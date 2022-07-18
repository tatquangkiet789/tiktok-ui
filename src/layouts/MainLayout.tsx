import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from './components/Navbar';

const MainLayout: React.FC = () => {
    return (
        <div className='container mx-auto w-full h-screen flex flex-col'>
            <Navbar />
            {/* <Outlet /> */}
            {/* <Home /> */}
        </div>
    );
};

export default MainLayout;
