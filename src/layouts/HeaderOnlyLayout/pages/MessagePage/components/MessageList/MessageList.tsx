import classNames from 'classnames/bind';
import React from 'react';
import MessageItem from '../MessageItem/MessageItem';
import styles from './MessageList.module.scss';

const cx = classNames.bind(styles);

const MessageList: React.FC = () => {
    return (
        <div className={cx('container')}>
            <MessageItem />
        </div>
    );
};

export default MessageList;
