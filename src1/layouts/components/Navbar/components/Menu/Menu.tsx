import { ThreeDotIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './Menu.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from 'components/Wrapper/Wrapper';
import { useAppSelector } from 'hooks/useAppSelector';
import MenuItem from './components/MenuItem/MenuItem';
import MenuHeader from './components/MenuHeader/MenuHeader';
import { IoLanguage, IoLogOutOutline } from 'react-icons/io5';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { logoutUser } from 'redux/reducers/authSlice';

const cx = classNames.bind(styles);

const Menu: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [openLanguage, setOpenLanguage] = useState(false);

    const handleOpenLanguageMenu = () => {
        setOpenLanguage(true);
    };

    const handleLogoutUser = () => {
        dispatch(logoutUser());
    };

    const menuItems = [
        {
            content: 'Ngôn ngữ',
            icon: <IoLanguage size={20} />,
            handleClick: handleOpenLanguageMenu,
        },
    ];

    return (
        <HeadlessTippy
            zIndex={1}
            interactive
            placement='bottom-end'
            render={(attrs) => (
                <div tabIndex={-1} {...attrs} className={cx('menu-wrapper')}>
                    <Wrapper>
                        {openLanguage ? (
                            <React.Fragment>
                                <MenuHeader onCloseLanguageMenu={setOpenLanguage} />
                                <div className={cx('language-menu')}>
                                    <MenuItem content='Tiếng Việt' />
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {menuItems.map(
                                    ({ content, icon, handleClick }, index) => (
                                        <MenuItem
                                            key={index}
                                            content={content}
                                            icon={icon}
                                            onClick={handleClick}
                                        />
                                    ),
                                )}
                                {currentUser ? (
                                    <MenuItem
                                        content='Đăng xuất'
                                        icon={<IoLogOutOutline size={20} />}
                                        onClick={handleLogoutUser}
                                    />
                                ) : null}
                            </React.Fragment>
                        )}
                    </Wrapper>
                </div>
            )}
        >
            <div className={cx('container')}>
                <ThreeDotIcon />
            </div>
        </HeadlessTippy>
    );
};

export default Menu;
