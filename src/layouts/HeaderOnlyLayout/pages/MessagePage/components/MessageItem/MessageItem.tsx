import classNames from 'classnames/bind';
import React from 'react';
import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);

const MessageItem: React.FC = () => {
    return <div className={cx('container')}>MessageItem</div>;
};

export default MessageItem;
