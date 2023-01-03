import classNames from 'classnames/bind';
import React from 'react';
import styles from './NotFoundPage.module.scss';

const cx = classNames.bind(styles);

const NotFoundPage: React.FC = () => {
    return (
        <div className={cx('container')}>
            <h1>Không tìm thấy trang bạn yêu cầu</h1>
        </div>
    );
};

export default NotFoundPage;
