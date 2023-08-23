import classNames from 'classnames/bind';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import styles from './HeaderOnlyLayout.module.scss';

const cx = classNames.bind(styles);

const HeaderOnlyLayout: React.FC = () => {
    return (
        <div className={cx('container')}>
            <Navbar />
            <div className={cx('wrapper')}>
                <Outlet />
            </div>
        </div>
    );
};

export default HeaderOnlyLayout;
