import classNames from 'classnames/bind';
import { FC } from 'react';
import UserItem from '../UserItem/UserItem';
import styles from './UserList.module.scss';

const cx = classNames.bind(styles);

const UserList: FC = () => {
    const userList = [
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
    ];

    return (
        <div className={cx('container')}>
            {userList.map(({ avatar, username, lastestMessage }, index) => (
                <UserItem
                    key={index}
                    avatar={avatar}
                    username={username}
                    lastestMessage={lastestMessage}
                />
            ))}
            {userList.map(({ avatar, username, lastestMessage }, index) => (
                <UserItem
                    key={index}
                    avatar={avatar}
                    username={username}
                    lastestMessage={lastestMessage}
                />
            ))}
        </div>
    );
};

export default UserList;
