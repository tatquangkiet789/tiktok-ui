import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { findAllPosts, updateNewPostList } from 'redux/reducers/postSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const { posts, postError, postLoading, hasNextPage } = useAppSelector(
        (state) => state.posts,
    );

    useEffect(() => {
        if (page === 1) dispatch(updateNewPostList(true));
        else dispatch(updateNewPostList(false));

        dispatch(findAllPosts({ page: page }));
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

export default HomePage;
