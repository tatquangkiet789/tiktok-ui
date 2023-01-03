import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserDetailPage.module.scss';

const cx = classNames.bind(styles);

const UserDetailPage: React.FC = () => {
    const { username } = useParams();

    useEffect(() => {
        if (!username) return;
    }, []);

    return <div className={cx('container')}>UserDetailPage {username}</div>;
};

export default UserDetailPage;
