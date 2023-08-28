import classNames from 'classnames/bind';
import React from 'react';
import styles from './PreviewAccount.module.scss';

const cx = classNames.bind(styles);

const PreviewAccount: React.FC = () => {
    return <div className={cx('container')}>PreviewAccount</div>;
};

export default PreviewAccount;
