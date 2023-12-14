import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-gray248_248_248 overflow-y-scroll'>
            <Navbar />
            <div className='flex p-[18px] w-full gap-[18px] h-[calc(100vh-60px)] bg-gray241_241_242_1'>
                <Sidebar />
                <div className='h-[cal(100vh-60px)] ml-[358px]'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
