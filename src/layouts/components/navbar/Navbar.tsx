import React, { useState } from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { loginUser } from 'redux/reducers/authSlice';
import Search from './components/Search/Search';
import {
    AddIcon,
    LogoIcon,
    MessageIcon,
    NotificationIcon,
    ThreeDotIcon,
} from 'assets/icons';
import Button from 'components/Button/Button';
import routes from 'routes/routes';
import Menu from './components/Menu/Menu';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [openNotification, setOpenNotification] = useState(false);

    const handleOpenNotification = () => {
        setOpenNotification((prev) => {
            return !prev;
        });
    };

    return (
        <React.Fragment>
            <div className={cx('container')}>
                <div className={cx('wrapper')}>
                    {/* <img src={logo} alt='TikTok' /> */}
                    <LogoIcon />
                    <Search />
                    <div className={cx('menu')}>
                        <Button
                            text='Tải lên'
                            variant='default'
                            iconLeft={<AddIcon />}
                            size='md'
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
                                        to={`${routes.auth}/${routes.login}`}
                                    />
                                </span>
                            </React.Fragment>
                        )}
                        <Menu />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
