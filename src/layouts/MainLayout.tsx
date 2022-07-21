import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar/Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <Navbar />
            <div className='flex w-[1150px] mx-auto'>
                <div className='w-[356px]'>
                    <Sidebar />
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
