import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import routes from 'constants/routes';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { Fragment, useEffect, useState } from 'react';
import { IoArrowBackOutline, IoVideocamOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { findAllFriends } from 'redux/reducers/friendSlice';
import { findAllMessagesByUserId } from 'redux/reducers/messageSlice';
import AddMessage from './components/AddMessage/AddMessage';
import FriendList from './components/FriendList/FriendList';
import MessageList from './components/MessageList/MessageList';
import SearchFriend from './components/SearchFriend/SearchFriend';
import styles from './MessagePage.module.scss';

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

    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) return;

        if (!receiverInfo) {
            console.log('Initial Load');

            dispatch(findAllFriends({ accessToken: accessToken }))
                .unwrap()
                .then((result) => {
                    dispatch(
                        findAllMessagesByUserId({
                            userId: result.content[0].id,
                            accessToken: accessToken,
                        }),
                    );
                });
            return;
        }
        console.log('After inital load');

        dispatch(
            findAllMessagesByUserId({
                userId: receiverInfo.id,
                accessToken: accessToken,
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
                    <div className={cx('receiver-info')}>
                        {receiverInfo === null ? (
                            <p>Đang tải người nhận</p>
                        ) : (
                            <Fragment>
                                <img
                                    src={receiverInfo.avatar}
                                    alt={receiverInfo.username}
                                    className={cx('avatar')}
                                />
                                <p className={cx('username')}>
                                    {receiverInfo.lastName} {receiverInfo.firstName}
                                </p>
                            </Fragment>
                        )}
                    </div>
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
