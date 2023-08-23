import classNames from 'classnames/bind';
import { FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { IoMdClose } from 'react-icons/io';
import waves from 'assets/images/waves.svg';
import { ROUTES } from 'constants/api';

const cx = classNames.bind(styles);

const AuthLayout: FC = () => {
    const { pathname } = useLocation();

    return (
        <div className={cx('container')} style={{ backgroundImage: `url(${waves})` }}>
            <div className={cx('wrapper')}>
                <Link to={ROUTES.home} className={cx('close')}>
                    <IoMdClose size={24} />
                </Link>
                <div className={cx('content')}>
                    <Outlet />
                </div>
                {/* {pathname === '/auth/login' ? (
                    <div className={cx('bottom-info')}>
                        Bạn không có tài khoản?
                        <Link className={cx('bottom-link')} to={ROUTES.register}>
                            Đăng ký
                        </Link>
                    </div>
                ) : null}
                {pathname === '/auth/register' ? (
                    <div className={cx('bottom-info')}>
                        Bạn đã có tài khoản?
                        <Link className={cx('bottom-link')} to={ROUTES.login}>
                            Đăng nhập
                        </Link>
                    </div>
                ) : null} */}
            </div>
        </div>
    );
};

export default AuthLayout;
