import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import { findAllPosts } from 'redux/reducers/postSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    const { posts, updateLikeStatus } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(findAllPosts(page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateLikeStatus]);

    return (
        <div className={cx('container')}>
            <PostList posts={posts} />
        </div>
    );
};

export default HomePage;