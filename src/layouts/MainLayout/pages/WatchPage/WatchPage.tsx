import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react';
import {
    updateNewPostList,
    findAllPosts,
    findAllPostsAreVideo,
} from 'redux/reducers/postSlice';
import styles from './WatchPage.module.scss';

const cx = classNames.bind(styles);

const WatchPage: React.FC = () => {
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const { posts, postError, postLoading, hasNextPage } = useAppSelector(
        (state) => state.posts,
    );

    useEffect(() => {
        if (page === 1) dispatch(updateNewPostList(true));
        else dispatch(updateNewPostList(false));

        findAllPostsAreVideo({ page: page });
    }, [dispatch, page]);

    return (
        <div className={cx('container')}>
            <PostList
                page={page}
                onChangePage={setPage}
                postList={posts}
                postError={postError}
                postLoading={postLoading}
                hasNextPage={hasNextPage}
            />
        </div>
    );
};

export default WatchPage;
