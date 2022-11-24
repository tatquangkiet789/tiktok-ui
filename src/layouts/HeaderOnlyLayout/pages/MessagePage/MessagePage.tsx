import classNames from 'classnames/bind';
import React from 'react';
import styles from './MessagePage.module.scss';

const cx = classNames.bind(styles);

const MessagePage: React.FC = () => {
    return <div className={cx('container')}>MessagePage</div>;
};

export default MessagePage;
