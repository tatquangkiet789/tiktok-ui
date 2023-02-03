import { TickIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import moment from 'moment';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './AccountInfo.module.scss';

const cx = classNames.bind(styles);

interface IAccountInfoProps {
    firstName: string;
    lastName: string;
    username: string;
    createdDate: Date;
    tick: boolean;
    avatar: string;
    padding: boolean;
}

const AccountInfo: React.FC<IAccountInfoProps> = ({
    firstName,
    lastName,
    avatar,
    createdDate,
    tick,
    username,
    padding,
}) => {
    return (
        <div
            className={cx('container', {
                padding: padding,
            })}
        >
            <img className={cx('image')} src={avatar} alt={username} />
            <div className={cx('username')}>
                <Link to={`/${username}`} className={cx('fullname')}>
                    {lastName} {firstName}
                    {tick ? <TickIcon /> : null}
                </Link>
                <span className={cx('created-date')}>
                    {moment(new Date(createdDate).getTime()).fromNow()}
                </span>
            </div>
        </div>
    );
};

export default memo(AccountInfo);
