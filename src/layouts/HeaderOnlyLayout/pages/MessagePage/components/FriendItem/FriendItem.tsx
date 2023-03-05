import { useAppDispatch } from 'app/core/hooks/useAppDispatch';
import classNames from 'classnames/bind';
import { FC } from 'react';
import { setReceiverInfo } from 'redux/reducers/friendSlice';
import styles from './FriendItem.module.scss';

const cx = classNames.bind(styles);

interface IFriendItemProps {
    userId: number;
    avatar: string;
    lastestMessage?: string;
    fullname: string;
}

const FriendItem: FC<IFriendItemProps> = ({
    userId,
    avatar,
    lastestMessage,
    fullname,
}) => {
    const dispatch = useAppDispatch();

    const handleSetReceiverInfo = () => {
        dispatch(setReceiverInfo(userId));
    };

    return (
        <div className={cx('container')} onClick={handleSetReceiverInfo}>
            <img src={avatar} className={cx('avatar')} alt='Friend Avatar' />
            <div className={cx('username-container')}>
                <span className={cx('username')}>{fullname}</span>
                <p className={cx('lastest-message')}>{lastestMessage}</p>
            </div>
        </div>
    );
};

export default FriendItem;
