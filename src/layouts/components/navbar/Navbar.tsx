import React, { memo, useState } from 'react';
import logo from '../../../assets/icons/logo.svg';
import Search from './Search/Search';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { ReactComponent as ThreeDotIcon } from '../../../assets/icons/threedot.svg';
import Button from '../../../components/Button/Button';
import { loginUser, logoutUser } from '../../../slices/authSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { NavLink } from 'react-router-dom';
import routes from '../../../routes/routes';
import { ReactComponent as MessageIcon } from '../../../assets/icons/messenger.svg';
import { ReactComponent as NotificationIcon } from '../../../assets/icons/notification.svg';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const [openNotification, setOpenNotification] = useState(false);
    const dispatch = useAppDispatch();

    const handleLoginUser = () => {
        dispatch(loginUser());
    };

    const handleOpenNotification = () => {
        setOpenNotification((prev) => {
            return !prev;
        });
    };

    const handleLogutUser = () => {
        dispatch(logoutUser());
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <img src={logo} alt='TikTok' />
                <Search />
                <div className={cx('menu')}>
                    <Button text='Tải lên' type='default' iconLeft={<AddIcon />} />
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
                                    type='primary'
                                    onClick={handleLoginUser}
                                />
                            </span>
                            <span className={cx('see-more')}>
                                <ThreeDotIcon />
                            </span>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(Navbar);
