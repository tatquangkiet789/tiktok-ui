import classNames from 'classnames/bind';
import React from 'react';
import styles from './AccountItem.module.scss';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';

const cx = classNames.bind(styles);

interface AccountItemProps {
    name: string;
    username: string;
    avatar: string;
    tick?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ name, username, avatar, tick }) => {
    return (
        <div className={cx('container')}>
            <img src={avatar} alt={name} className={cx('image')} />
            <div className={cx('wrapper')}>
                <p className={cx('name')}>
                    {name}
                    {tick ? <TickIcon /> : null}
                </p>
                <p className={cx('username')}>{username}</p>
            </div>
        </div>
    );
};

export default AccountItem;
