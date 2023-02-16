import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './UserDetailPage.module.scss';

const cx = classNames.bind(styles);

const UserDetailPage: React.FC = () => {
    const { username } = useParams();
    const [page, setPage] = useState(1);

    const previousUsername = useRef<string | undefined>('');

    useEffect(() => {
        if (!username) return;
        previousUsername.current = username;
    }, [username]);

    return (
        <div className={cx('container')}>
            <PostList
                username={username}
                page={page}
                onChangePage={setPage}
                isChangeUsername={!(previousUsername.current === username)}
            />
        </div>
    );
};

export default UserDetailPage;
