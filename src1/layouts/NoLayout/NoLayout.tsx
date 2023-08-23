import classNames from 'classnames/bind';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './NoLayout.module.scss';

const cx = classNames.bind(styles);

const NoLayout: React.FC = () => {
    return (
        <div className={cx('container')}>
            <Outlet />
        </div>
    );
};

export default NoLayout;
