import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { useAppSelector } from 'hooks/useAppSelector';
import Search from './components/Search/Search';
import { AddIcon, LogoIcon, MessageIcon, NotificationIcon } from 'assets/icons';
import Button from 'components/Button/Button';
import Menu from './components/Menu/Menu';
import routes from 'constants/routes';
import CreateNewPost from './components/CreateNewPost/CreateNewPost';
import socketClient from 'libs/socketClient';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from 'components/Wrapper/Wrapper';
import NotificationList from './components/NotificationList/NotificationList';
import { IReceiveNotification } from 'models/notificationDTO';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {
    receiveNewNotification,
    resetTotalNotification,
} from 'redux/reducers/notificationSlice';
import { userLikePost } from 'redux/reducers/postSlice';
import { SOCKET_EVENT } from 'constants/constants';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { notificationList, totalNotifications } = useAppSelector(
        (state) => state.notifications,
    );
    const dispatch = useAppDispatch();

    const [openNotification, setOpenNotification] = useState(false);
    const [openCreateNewPost, setOpenCreateNewPost] = useState(false);

    const navigate = useNavigate();

    const handleOpenCreateNewPostModal = () => {
        if (!currentUser) {
            return navigate(routes.login, {
                replace: true,
            });
        }
        setOpenCreateNewPost(true);
    };

    useEffect(() => {
        if (!currentUser) return;

        const { username } = currentUser;
        // socketClient.emit(SOCKET_EVENT.NEW_USER, username);
    }, [currentUser]);

    // useEffect(() => {
    //     socketClient.on(
    //         SOCKET_EVENT.RECEIVE_NOTIFICATION,
    //         (data: IReceiveNotification) => {
    //             dispatch(receiveNewNotification(data));
    //             dispatch(userLikePost(data.postId));
    //         },
    //     );
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [socketClient]);

    const handleOpenNotification = () => {
        setOpenNotification((prev) => {
            return !prev;
        });
        dispatch(resetTotalNotification());
    };

    return (
        <React.Fragment>
            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <Link to={routes.home}>
                        <LogoIcon />
                    </Link>

                    <Search />
                    <div className={cx('menu')}>
                        <Button
                            text='Tải lên'
                            variant='default'
                            iconLeft={<AddIcon />}
                            size='md'
                            onClick={handleOpenCreateNewPostModal}
                        />
                        {currentUser ? (
                            <React.Fragment>
                                <Tippy content='Tin nhắn'>
                                    <NavLink
                                        data-count={totalNotifications}
                                        to={routes.messages}
                                        className={(nav) =>
                                            cx('message', {
                                                active: nav.isActive,
                                                showTotalNotification:
                                                    totalNotifications !== 0,
                                            })
                                        }
                                    >
                                        <MessageIcon />
                                    </NavLink>
                                </Tippy>
                                <HeadlessTippy
                                    interactive
                                    visible={openNotification}
                                    onClickOutside={() => setOpenNotification(false)}
                                    render={(attrs) => (
                                        <div
                                            tabIndex={-1}
                                            {...attrs}
                                            className={cx('notification-container')}
                                        >
                                            <p className={cx('notification-text')}>
                                                Thông báo
                                            </p>
                                            <Wrapper>
                                                <NotificationList
                                                    notificationList={notificationList}
                                                />
                                            </Wrapper>
                                        </div>
                                    )}
                                >
                                    <div
                                        data-count={totalNotifications}
                                        className={cx('notification', {
                                            active: openNotification,
                                            showTotalNotification:
                                                totalNotifications !== 0,
                                        })}
                                        onClick={handleOpenNotification}
                                    >
                                        <NotificationIcon />
                                    </div>
                                </HeadlessTippy>
                                <Tippy content='Tài khoản'>
                                    <div
                                        className={cx('user')}
                                        style={{
                                            backgroundImage: `url(${currentUser.avatar})`,
                                        }}
                                    ></div>
                                </Tippy>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <span className={cx('auth-button')}>
                                    <Button
                                        text='Đăng nhập'
                                        variant='primary'
                                        size='md'
                                        to={`${routes.login}`}
                                    />
                                </span>
                            </React.Fragment>
                        )}
                        <Menu />
                    </div>
                </div>
            </div>
            {openCreateNewPost ? (
                <CreateNewPost onCloseCreateNewPostModal={setOpenCreateNewPost} />
            ) : null}
        </React.Fragment>
    );
};

export default Navbar;
