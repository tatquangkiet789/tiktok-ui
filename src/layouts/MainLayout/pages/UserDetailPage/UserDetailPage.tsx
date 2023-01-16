import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findAllPosts, findAllPostsByCurrentUserId } from 'redux/reducers/postSlice';
import styles from './UserDetailPage.module.scss';

const cx = classNames.bind(styles);

const UserDetailPage: React.FC = () => {
    const { username } = useParams();
    const [page, setPage] = useState(1);
    const [author, setAuthor] = useState(false);

    const { postLoading, posts } = useAppSelector((state) => state.posts);
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!username) return;

        if (currentUser?.username === username) {
            setAuthor(true);
            console.log(`Current user find all posts`);
            const { accessToken } = currentUser;
            dispatch(
                findAllPostsByCurrentUserId({ page: page, accessToken: accessToken }),
            );
        } else dispatch(findAllPosts({ page: page, username: username }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, currentUser]);

    if (postLoading) return <div>Posts loading...</div>;

    console.log(`Post length: ${posts.length}`);

    return (
        <div className={cx('container')}>
            {posts.length === 0 ? (
                author ? (
                    <div>Tải lên bài viết đầu tiên</div>
                ) : (
                    <div>Không có nội dung</div>
                )
            ) : (
                <PostList posts={posts} />
            )}
        </div>
    );
};

export default UserDetailPage;
