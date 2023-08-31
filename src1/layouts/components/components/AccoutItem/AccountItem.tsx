import { TickIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

interface IAccountItemProps {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    tick?: boolean;
    size?: string;
}

const AccountItem: React.FC<IAccountItemProps> = ({
    firstName,
    lastName,
    username,
    avatar,
    tick,
    size,
}) => {
    return (
        <Link
            className={cx('container', {
                [`${size}`]: true,
            })}
            to={`/${username}`}
        >
            <img src={avatar} alt={`${lastName} ${firstName}`} className={cx('image')} />
            <div className={cx('wrapper')}>
                <p className={cx('name')}>
                    {lastName} {firstName}
                    {tick ? <TickIcon /> : null}
                </p>
                <p className={cx('username')}>{username}</p>
            </div>
        </Link>
    );
};

export default AccountItem;
