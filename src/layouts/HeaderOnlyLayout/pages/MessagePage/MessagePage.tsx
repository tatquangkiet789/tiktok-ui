import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { SOCKET_EVENT, STORAGE_KEY } from 'constants/constants';
import routes from 'constants/routes';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import socketClient from 'libs/socketClient';
import React, { Fragment, useEffect } from 'react';
import { IoArrowBackOutline, IoVideocamOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    findAllFriends,
    setLastestMessageToFriendList,
} from 'redux/reducers/friendSlice';
import {
    findAllMessagesByUserId,
    receiveNewMessageFromSocket,
} from 'redux/reducers/messageSlice';
import AddMessage from './components/AddMessage/AddMessage';
import FriendList from './components/FriendList/FriendList';
import MessageList from './components/MessageList/MessageList';
import ReceiverInfo from './components/ReceiverInfo/ReceiverInfo';
import SearchFriend from './components/SearchFriend/SearchFriend';
import styles from './MessagePage.module.scss';
import { IReceiveMessageDTO } from './models/messageDTO';

const cx = classNames.bind(styles);

const MessagePage: React.FC = () => {
    const {
        filterList,
        loading: friendLoading,
        error: friendError,
        receiverInfo,
    } = useAppSelector((state) => state.friends);
    const {
        messageList,
        loading: messageLoading,
        error: messageError,
    } = useAppSelector((state) => state.messages);
    const dispatch = useAppDispatch();

    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) return;

        dispatch(findAllFriends({ accessToken: accessToken }));

        if (!receiverInfo) return;

        dispatch(
            findAllMessagesByUserId({
                accessToken: accessToken,
                userId: receiverInfo.id,
            }),
        );
    }, [accessToken, dispatch, receiverInfo]);

    return (
        <div className={cx('container')}>
            <Link to={routes.home} className={cx('back-icon')}>
                <IoArrowBackOutline size={30} />
            </Link>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar-header')}>
                    <h3>Tin nhắn</h3>
                </div>
                <div className={cx('search-friend-container')}>
                    <SearchFriend />
                </div>
                <div className={cx('friend-container')}>
                    <FriendList
                        friendList={filterList}
                        loading={friendLoading}
                        error={friendError}
                    />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('receiver-container')}>
                    <ReceiverInfo
                        receiverInfo={receiverInfo}
                        loading={friendLoading}
                        error={friendError}
                    />
                    <Tippy content='Bắt đầu gọi video'>
                        <span className={cx('video-call-button')}>
                            <IoVideocamOutline size={30} />
                        </span>
                    </Tippy>
                </div>
                <div className={cx('message-container')}>
                    <MessageList
                        messageList={messageList}
                        loading={messageLoading}
                        error={messageError}
                    />
                </div>
                <AddMessage />
            </div>
        </div>
    );
};

export default MessagePage;
