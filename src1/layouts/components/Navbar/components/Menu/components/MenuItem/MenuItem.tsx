import classNames from 'classnames/bind';
import React, { memo } from 'react';
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

interface IMenuItemProps {
    content: string;
    icon?: any;
    onClick?: (value: any) => void;
}

const MenuItem: React.FC<IMenuItemProps> = ({ content, icon, onClick }) => {
    return (
        <div className={cx('container')} onClick={onClick}>
            <span className={cx('icon')}>{icon}</span>
            <p className={cx('content')}>{content}</p>
        </div>
    );
};

export default memo(MenuItem);
