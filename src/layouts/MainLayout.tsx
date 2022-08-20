import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Navbar = React.lazy(() => import('./components/navbar/Navbar'));
const Sidebar = React.lazy(() => import('./components/sidebar/Sidebar'));
const Footer = React.lazy(() => import('./components/footer/Footer'));

const MainLayout: React.FC = () => {
    const location = useLocation();
    let fullscreen = false;
    let containerWidth = 'w-[1150px]';

    if (location.pathname === '/live') {
        fullscreen = true;
        containerWidth = 'w-full';
    }

    return (
        <div className='w-full h-screen flex flex-col'>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Navbar fullscreen={fullscreen} />
            </React.Suspense>
            <div className={`${containerWidth} mx-auto`}>
                <div
                    className='max-w-[356px] pr-2 fixed top-[65px] h-[91vh]
                        overflow-hidden hover:overflow-y-scroll'
                >
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Sidebar />
                    </React.Suspense>

                    <div className='flex flex-col mt-[18px] mr-[6px] mb-[20px]'>
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <Footer />
                        </React.Suspense>
                    </div>
                </div>
                <div className='flex-1 ml-[356px] mt-[60px] relative'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
