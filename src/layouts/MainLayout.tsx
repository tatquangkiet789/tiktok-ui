import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='bg-gray248_248_248'>
            <Navbar />
            <div className='flex w-[1150px] p-[18px] gap-[18px] h-[calc(100vh-60px)] mx-auto overflow-y-auto'>
                <Sidebar />
                <div className='h-[cal(100vh-60px)] ml-[358px] bg-red-200'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
