import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC, useEffect, useState } from 'react';
import { findAllPosts, updateNewPostList } from 'redux/reducers/postSlice';
import styles from './Home.module.scss';
import PostList from 'modules/posts/components/PostList/PostList';

const cx = classNames.bind(styles);

const Home: FC = () => {
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const {
        posts,
        error: postError,
        loading: postLoading,
        hasNextPage,
    } = useAppSelector((state) => state.posts);

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

export default Home;
