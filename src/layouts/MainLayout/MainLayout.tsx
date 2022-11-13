import classNames from 'classnames/bind';
import React from 'react';
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
                <div>Content</div>
            </div>
        </div>
    );
};

export default MainLayout;
