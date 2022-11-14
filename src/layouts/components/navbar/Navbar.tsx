import React, { memo } from 'react';
import logo from '../../../assets/icons/logo.svg';
import Search from './Search/Search';
import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { ReactComponent as ThreeDotIcon } from '../../../assets/icons/threedot.svg';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);

const Navbar: React.FC = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <img src={logo} alt='TikTok' />
                <Search />
                <div className={cx('menu')}>
                    <Button text='Tải lên' type='default' iconLeft={<AddIcon />} />
                    <span className={cx('login')}>
                        <Button text='Đăng nhập' type='primary' />
                    </span>
                    <span className={cx('see-more')}>
                        <ThreeDotIcon />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(Navbar);
