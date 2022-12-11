import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../../../../components/PostList/PostList';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IPost } from '../../../../models/post';
import { IUser } from '../../../../models/user';
import { findAllPosts } from '../../../../redux/reducers/postSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    const { posts, hasNextPage, updateLikeStatus } = useAppSelector(
        (state) => state.posts,
    );
    const dispatch = useAppDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(findAllPosts(page));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateLikeStatus]);

    return (
        <div className={cx('container')}>
            {/* <InfiniteScroll
                dataLength={posts.length}
                loader={<h4>Loading...</h4>}
                next={fetchMorePosts}
                hasMore={hasNextPage}
            >
            {JSON.stringify(posts)}
        </InfiniteScroll> */}
            <PostList posts={posts} />
        </div>
    );
};

export default HomePage;
