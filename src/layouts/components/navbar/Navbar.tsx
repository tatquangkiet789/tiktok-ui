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
// import socketClient from 'libs/socketClient';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);

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

        // socketClient.emit('newUser', currentUser.username);
    }, [currentUser]);

    // useEffect(() => {
    //     socketClient.on('receiveNotification', (senderName: string) => {
    //         console.log(`${senderName} thích bài viết của bạn`);
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [socketClient]);

    const handleOpenNotification = () => {
        setOpenNotification((prev) => {
            return !prev;
        });
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
                                        to={routes.messages}
                                        className={(nav) =>
                                            cx('message', { active: nav.isActive })
                                        }
                                    >
                                        <MessageIcon />
                                    </NavLink>
                                </Tippy>
                                <Tippy content='Hộp thư'>
                                    <div
                                        className={cx('notification', {
                                            active: openNotification,
                                        })}
                                        onClick={handleOpenNotification}
                                    >
                                        <NotificationIcon />
                                    </div>
                                </Tippy>
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
