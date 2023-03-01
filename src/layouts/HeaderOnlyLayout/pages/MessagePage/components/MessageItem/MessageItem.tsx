import classNames from 'classnames/bind';
import React, { Fragment } from 'react';
import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);

interface IMessageItemProps {
    avatar: string;
    content: string;
}

const MessageItem: React.FC<IMessageItemProps> = ({ avatar, content }) => {
    const currentUserAvatar =
        'https://res.cloudinary.com/dnwauajh9/image/upload/v1671507776/uolu8eprll8lk63y6xja.jpg';

    return (
        <div
            className={cx('container', {
                send: currentUserAvatar === avatar,
            })}
        >
            <div
                className={cx('avatar')}
                style={{ backgroundImage: `url(${avatar})` }}
            ></div>
            <p className={cx('content')}>{content}</p>
        </div>
    );
};

export default MessageItem;
