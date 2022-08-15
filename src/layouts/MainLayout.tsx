import React from 'react';
import { Outlet } from 'react-router-dom';

const Navbar = React.lazy(() => import('./components/navbar/Navbar'));
const Sidebar = React.lazy(() => import('./components/sidebar/Sidebar'));
const Footer = React.lazy(() => import('./components/footer/Footer'));

const MainLayout: React.FC = () => {
    return (
        <div className='w-full h-screen flex flex-col'>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </React.Suspense>
            <div className='w-[1150px] mx-auto'>
                <div
                    className='max-w-[356px] h-screen pr-2 fixed top-[65px] 
                        overflow-scroll'
                >
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Sidebar />
                        <Footer />
                    </React.Suspense>
                </div>
                <div className='flex-1 ml-[356px] mt-[60px] bg-red-100'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
