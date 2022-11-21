import classNames from 'classnames/bind';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

const MainLayout: React.FC = () => {
    return (
        <div className={cx('container')}>
            <Navbar />
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('content')}>
                    <Outlet />
                </div>
            </div>
            <div className={cx('download-app')}>Tải ứng dụng</div>
        </div>
    );
};

export default MainLayout;
