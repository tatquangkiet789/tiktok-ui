import waves from 'assets/images/waves.svg';
import { IoMdClose } from 'react-icons/io';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { APP_ROUTES } from 'routes/routes';

const AuthLayout = () => {
    const { pathname } = useLocation();

    return (
        <div className='h-screen w-screen z-50 flex justify-center items-center relative overflow-hidden'>
            <div
                style={{ backgroundImage: `url(${waves})`, width: '200vw' }}
                className='absolute h-full left-0 bg-repeat-x bg-cover animate-wave'
            ></div>
            <div className='w-[483px] rounded-lg shadow-lg flex flex-col items-center h-[75vh] z-10 bg-white'>
                <Link
                    to={APP_ROUTES.HOME}
                    className='flex self-end rounded-full bg-gray003 p-[10px] mt-[15px] mr-[15px]'
                >
                    <IoMdClose size={24} />
                </Link>
                <div className='py-0 px-[54px] w-full h-full overflow-y-auto'>
                    <Outlet />
                </div>
                {pathname === '/auth/login' ? (
                    <div className='justify-self-end w-full text-center text-[15px] leading-[18px] py-5 border-t-[1px] border-t-gray012'>
                        Bạn không có tài khoản?
                        <Link
                            className='text-primary ml-[5px] font-semibold'
                            to={APP_ROUTES.REGISTER}
                        >
                            Đăng ký
                        </Link>
                    </div>
                ) : null}
                {pathname === '/auth/register' ? (
                    <div className='justify-self-end w-full text-center text-[15px] leading-[18px] py-5 border-t-[1px] border-t-gray012'>
                        Bạn đã có tài khoản?
                        <Link
                            className='text-primary ml-[5px] font-semibold'
                            to={APP_ROUTES.LOGIN}
                        >
                            Đăng nhập
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AuthLayout;
