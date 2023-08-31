import { useAppDispatch } from 'app/core/hooks/useAppDispatch';
import { TickIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC } from 'react';
import { resetUserReceiveNewMessage, setReceiverInfo } from 'redux/reducers/friendSlice';
import styles from './FriendItem.module.scss';

const cx = classNames.bind(styles);

interface IFriendItemProps {
    userId: number;
    avatar: string;
    lastestMessage?: string;
    fullname: string;
    tick: boolean;
}

const FriendItem: FC<IFriendItemProps> = ({
    userId,
    avatar,
    lastestMessage,
    fullname,
    tick,
}) => {
    const dispatch = useAppDispatch();
    const { selectedId, userReceivedNewMessageId } = useAppSelector(
        (state) => state.friends,
    );

    const handleSetReceiverInfo = () => {
        if (userId === userReceivedNewMessageId) dispatch(resetUserReceiveNewMessage());
        dispatch(setReceiverInfo(userId));
    };

    return (
        <div
            className={cx('container', {
                active: selectedId === userId,
            })}
            onClick={handleSetReceiverInfo}
        >
            <img src={avatar} className={cx('avatar')} alt='Friend Avatar' />
            <div className={cx('username-container')}>
                <p className={cx('username')}>
                    {fullname}
                    {tick ? <TickIcon /> : null}
                </p>
                <p
                    className={cx('lastest-message', {
                        'new-message': userId === userReceivedNewMessageId,
                    })}
                >
                    {lastestMessage}
                </p>
            </div>
        </div>
    );
};

export default FriendItem;
