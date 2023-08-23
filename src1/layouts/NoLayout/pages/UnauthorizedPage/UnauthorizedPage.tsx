import classNames from 'classnames/bind';
import React from 'react';
import styles from './UnauthorizedPage.module.scss';

const cx = classNames.bind(styles);

const UnauthorizedPage: React.FC = () => {
    return (
        <div className={cx('container')}>
            <h1>Bạn không có quyền truy cập vào trang này</h1>
        </div>
    );
};

export default UnauthorizedPage;
