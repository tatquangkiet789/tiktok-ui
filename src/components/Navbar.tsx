import Tippy from '@tippyjs/react';
import { AddIcon, LogoIcon } from 'assets/icons';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'routes/routes';
import Button from './ui/Button';
import Search from './ui/Search';

const Navbar = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    // const { notificationList, totalNotifications } = useAppSelector(
    //     (state) => state.notifications,
    // );
    const dispatch = useAppDispatch();

    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);

    const navigate = useNavigate();

    const handleOpenCreateNewPostModal = () => {
        // if (!currentUser) {
        //     return navigate(APP_ROUTES.LOGIN, {
        //         replace: true,
        //     });
        // }
        // setIsOpenNewPostModal(true);
    };

    // useEffect(() => {
    //     if (!currentUser) return;

    //     const { username } = currentUser;
    //     socketClient.emit(SOCKET_EVENT.NEW_USER, username);

    //     return () => {
    //         socketClient.removeListener();
    //     };
    // }, [currentUser]);

    // useEffect(() => {
    //     socketClient.on(
    //         SOCKET_EVENT.RECEIVE_NOTIFICATION,
    //         (data: IReceiveNotification) => {
    //             dispatch(receiveNewNotification(data));
    //             dispatch(userLikePost(data.postId));
    //         },
    //     );

    //     return () => {
    //         socketClient.removeListener();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, socketClient]);

    const handleOpenNotification = () => {
        // setIsOpenNotification((prev) => {
        //     return !prev;
        // });
        // dispatch(resetTotalNotification());
    };

    return (
        <>
            <div className='w-screen h-[60px] shadow-[0_1px_1px_rgba(22, 24, 35, 0.12)] z-10 bg-white'>
                <div className='h-[60px] w-full lg:w-[1150px] mx-auto flex justify-between items-center pl-5 pr-6'>
                    <Link to={APP_ROUTES.HOME}>
                        <LogoIcon />
                    </Link>

                    <Search />
                    <div className='flex justify-between items-center'>
                        <Button
                            text='Tải lên'
                            variant='default'
                            iconLeft={<AddIcon />}
                            size='md'
                            onClick={handleOpenCreateNewPostModal}
                        />
                        {currentUser ? (
                            <>
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
                                {/* <HeadlessTippy
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
                                </HeadlessTippy> */}
                                <Tippy content='Tài khoản'>
                                    <div
                                        className='w-8 h-8 ml-6 cursor-pointer bg-no-repeat bg-center bg-contain rounded-full'
                                        style={{
                                            backgroundImage: `url(${currentUser.avatar})`,
                                        }}
                                    ></div>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <span className='ml-4'>
                                    <Button
                                        text='Đăng nhập'
                                        variant='primary'
                                        size='md'
                                        to={APP_ROUTES.LOGIN}
                                    />
                                </span>
                            </>
                        )}
                        {/* <Menu /> */}
                    </div>
                </div>
            </div>
            {/* {isOpenNewPostModal ? (
                <CreateNewPost onCloseCreateNewPostModal={setIsOpenNewPostModal} />
            ) : null} */}
        </>
    );
};

export default Navbar;
