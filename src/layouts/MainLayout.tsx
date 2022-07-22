import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from './components';

const MainLayout: React.FC = () => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <Navbar />
            <div className='w-[1150px] mx-auto'>
                <Sidebar />
                <div className='flex-1 ml-[356px] mt-[60px] bg-red-100'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
