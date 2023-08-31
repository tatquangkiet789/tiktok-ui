import classNames from 'classnames/bind';
import React from 'react';
import styles from './MenuHeader.module.scss';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const cx = classNames.bind(styles);

interface IMenuHeaderProps {
    onCloseLanguageMenu: (value: boolean) => void;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({ onCloseLanguageMenu }) => {
    const handleCloseLanguageMenu = () => {
        onCloseLanguageMenu(false);
    };

    return (
        <div className={cx('container')}>
            <span className={cx('icon')} onClick={handleCloseLanguageMenu}>
                <MdKeyboardArrowLeft size={30} />
            </span>
            <p className={cx('content')}>Ngôn ngữ</p>
        </div>
    );
};

export default MenuHeader;
