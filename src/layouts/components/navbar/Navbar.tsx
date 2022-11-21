import React, { memo } from 'react';
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

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleLoginUser = () => {
        dispatch(loginUser());
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
                        <span className={cx('auth-button')}>
                            <Button
                                text='Đăng xuất'
                                type='primary'
                                onClick={handleLogutUser}
                            />
                        </span>
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
