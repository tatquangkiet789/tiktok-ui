import classNames from 'classnames/bind';
import { FC } from 'react';
import styles from './UserItem.module.scss';

const cx = classNames.bind(styles);

interface IUserItemProps {
    username: string;
    avatar: string;
    lastestMessage: string;
}

const UserItem: FC<IUserItemProps> = ({ username, avatar, lastestMessage }) => {
    return (
        <div className={cx('container')}>
            <img src={avatar} className={cx('avatar')} alt='User Avatar' />
            <div className={cx('username-container')}>
                <span className={cx('username')}>{username}</span>
                <p className={cx('lastest-message')}>{lastestMessage}</p>
            </div>
        </div>
    );
};

export default UserItem;
