import { TickIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import { SOCKET_EVENT } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import socketClient from 'libs/socketClient';
import { FC, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    setLastestMessageToFriendList,
    setReceiverInfo,
} from 'redux/reducers/friendSlice';
import { receiveNewMessageFromSocket } from 'redux/reducers/messageSlice';
import { IFriendModel } from '../../models/friendDTO';
import { IReceiveMessageDTO } from '../../models/messageDTO';
import styles from './ReceiverInfo.module.scss';

const cx = classNames.bind(styles);

interface IReceiverInfoProps {
    receiverInfo: IFriendModel;
    loading: boolean;
    error: string;
}

const ReceiverInfo: FC<IReceiverInfoProps> = ({ receiverInfo, loading, error }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!receiverInfo) {
            toast.error('Vui lòng chọn người để nhắn tin');
            return;
        }

        socketClient.on(SOCKET_EVENT.RECEIVE_MESSAGE, (value: IReceiveMessageDTO) => {
            if (value.senderDetail.id === receiverInfo.id) {
                dispatch(receiveNewMessageFromSocket(value));
                console.log('In the same conversation');
            } else {
                dispatch(setLastestMessageToFriendList(value));
                console.log('Not in the same conversation');
                console.log('ReceiverInfo in useEffect', receiverInfo.id);
            }
        });

        return () => {
            socketClient.removeListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketClient, receiverInfo]);

    if (error) toast.error(error);

    return (
        <div className={cx('receiver-info')}>
            {receiverInfo === null && loading ? (
                <p>Đang tải người nhận</p>
            ) : receiverInfo === null ? (
                <p>Vui lòng chọn người để nhắn tin</p>
            ) : (
                <Fragment>
                    <img
                        src={receiverInfo.avatar}
                        alt={receiverInfo.username}
                        className={cx('avatar')}
                    />
                    <p className={cx('username')}>
                        {receiverInfo.lastName} {receiverInfo.firstName}
                        {receiverInfo.tick ? <TickIcon /> : null}
                    </p>
                </Fragment>
            )}
        </div>
    );
};

export default ReceiverInfo;
