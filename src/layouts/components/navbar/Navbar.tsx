import { FC, Fragment, useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { AddIcon, LogoIcon, MessageIcon, NotificationIcon } from 'assets/icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Search from './components/Search/Search';
import { ROUTES } from 'constants/api';
import Button from 'components/ui/Button/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import CreateNewPost from './components/CreateNewPost/CreateNewPost';
import Wrapper from 'components/ui/Wrapper/Wrapper';
import NotificationList from 'modules/notifications/components/NotificationList/NotificationList';
import socketClient from 'lib/socketClient';
import SOCKET_EVENT from 'constants/socket';
import { IReceiveNotification } from 'modules/notifications/models/notificationModel';
import {
    receiveNewNotification,
    resetTotalNotification,
} from 'redux/reducers/notificationSlice';
import { userLikePost } from 'redux/reducers/postSlice';

const cx = classNames.bind(styles);

const Navbar: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { notificationList, totalNotifications } = useAppSelector(
        (state) => state.notifications,
    );
    const dispatch = useAppDispatch();

    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);

    const navigate = useNavigate();

    const handleOpenCreateNewPostModal = () => {
        if (!currentUser) {
            return navigate(ROUTES.login, {
                replace: true,
            });
        }
        setIsOpenNewPostModal(true);
    };

    useEffect(() => {
        if (!currentUser) return;

        const { username } = currentUser;
        socketClient.emit(SOCKET_EVENT.NEW_USER, username);

        return () => {
            socketClient.removeListener();
        };
    }, [currentUser]);

    useEffect(() => {
        socketClient.on(
            SOCKET_EVENT.RECEIVE_NOTIFICATION,
            (data: IReceiveNotification) => {
                dispatch(receiveNewNotification(data));
                dispatch(userLikePost(data.postId));
            },
        );

        return () => {
            socketClient.removeListener();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, socketClient]);

    const handleOpenNotification = () => {
        setIsOpenNotification((prev) => {
            return !prev;
        });
        dispatch(resetTotalNotification());
    };

    return (
        <Fragment>
            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    <Link to={ROUTES.home}>
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
                            <Fragment>
                                {/* <Tippy content='Tin nhắn'>
                                    <NavLink
                                        data-count={totalNotifications}
                                        to={ROUTES.messages}
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
                                </Tippy> */}
                                <HeadlessTippy
                                    interactive
                                    visible={isOpenNotification}
                                    onClickOutside={() => setIsOpenNotification(false)}
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
                                        onClick={handleOpenNotification}
                                        data-count={totalNotifications}
                                        className={cx('notification', {
                                            active: isOpenNotification,
                                            showTotalNotification:
                                                totalNotifications !== 0,
                                        })}
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
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span className={cx('auth-button')}>
                                    <Button
                                        text='Đăng nhập'
                                        variant='primary'
                                        size='md'
                                        to={ROUTES.login}
                                    />
                                </span>
                            </Fragment>
                        )}
                        {/* <Menu /> */}
                    </div>
                </div>
            </div>
            {isOpenNewPostModal ? (
                <CreateNewPost onCloseCreateNewPostModal={setIsOpenNewPostModal} />
            ) : null}
        </Fragment>
    );
};

export default Navbar;
