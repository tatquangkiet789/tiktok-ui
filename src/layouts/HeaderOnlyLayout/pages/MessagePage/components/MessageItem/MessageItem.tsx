import classNames from 'classnames/bind';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);

interface IMessageItemProps {
    content: string;
    senderId: number;
    senderAvatar: string;
}

const MessageItem: React.FC<IMessageItemProps> = ({
    content,
    senderId,
    senderAvatar,
}) => {
    const { currentUser } = useAppSelector((state) => state.auth);

    return (
        <div
            className={cx('container', {
                send: currentUser.id === senderId,
            })}
        >
            <div
                className={cx('avatar')}
                style={{ backgroundImage: `url(${senderAvatar})` }}
            ></div>
            <p className={cx('content')}>{content}</p>
        </div>
    );
};

export default MessageItem;
