import classNames from 'classnames/bind';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountInfo.module.scss';

const cx = classNames.bind(styles);

interface IAccountInfoProps {
    firstName: string;
    lastName: string;
    username: string;
    createdDate?: Date;
    avatar: string;
}

const AccountInfo: React.FC<IAccountInfoProps> = ({
    firstName,
    lastName,
    avatar,
    createdDate,
    username,
}) => {
    return (
        <div className={cx('container')}>
            <img className={cx('image')} src={avatar} alt={username} />
            <div className={cx('username')}>
                <Link to={`/${username}`} className={cx('fullname')}>
                    {lastName} {firstName}
                </Link>
                <span className={cx('created-date')}>2 giờ</span>
            </div>
        </div>
    );
};

export default memo(AccountInfo);
