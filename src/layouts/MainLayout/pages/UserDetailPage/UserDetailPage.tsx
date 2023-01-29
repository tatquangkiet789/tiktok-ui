import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findAllPosts } from 'redux/reducers/postSlice';
import styles from './UserDetailPage.module.scss';

const cx = classNames.bind(styles);

const UserDetailPage: React.FC = () => {
    const { username } = useParams();

    const { currentUser } = useAppSelector((state) => state.auth);
    const { posts, postLoading, postError } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        if (!username) return;
        dispatch(findAllPosts({ page: page, username: username }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, dispatch]);

    return (
        <div className={cx('container')}>
            {postLoading ? (
                <div>Đang tải bài viết</div>
            ) : postError ? (
                <div>{postError}</div>
            ) : (
                <PostList postList={posts} />
            )}
        </div>
    );
};

export default UserDetailPage;
