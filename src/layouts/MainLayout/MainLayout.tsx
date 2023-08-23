import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';
import Navbar from 'layouts/components/Navbar/Navbar';

const cx = classNames.bind(styles);

const MainLayout: FC = () => {
    return (
        <div className={cx('container')}>
            <Navbar />
            <div className={cx('wrapper')}>
                {/* <Sidebar /> */}
                Sidebar
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
