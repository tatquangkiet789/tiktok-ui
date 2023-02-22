import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IPost } from 'models/post';
import { FC, Fragment, memo, useEffect, useRef, useState } from 'react';
import { findAllPosts, updateNewPostList } from 'redux/reducers/postSlice';
import PostItem from './components/PostItem/PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface IPostListProps {
    username?: string;
    currentUsername?: string;
    page: number;
    onChangePage: (page: any) => void;
    isChangeUsername?: boolean;
}

const PostList: FC<IPostListProps> = ({
    username,
    currentUsername,
    page,
    onChangePage,
    isChangeUsername,
}) => {
    const { posts, hasNextPage, postError, postLoading } = useAppSelector(
        (state) => state.posts,
    );
    const dispatch = useAppDispatch();

    const [element, setElement] = useState<HTMLDivElement | null>(null);

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) onChangePage((prev: any) => prev + 1);
        }),
    );

    useEffect(() => {
        if (page === 1 || isChangeUsername) {
            dispatch(updateNewPostList(true));
            onChangePage(1);
        } else dispatch(updateNewPostList(false));

        if (username) {
            dispatch(findAllPosts({ page: page, username: username }));
            return;
        }
        dispatch(findAllPosts({ page: page }));
    }, [dispatch, isChangeUsername, onChangePage, page, username]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (!currentElement) return;

        currentObserver.observe(currentElement);

        if (!hasNextPage) currentObserver.unobserve(currentElement);

        return () => currentObserver.unobserve(currentElement);
    }, [element, hasNextPage]);

    return (
        <div className={cx('container')}>
            {posts.length === 0 && postLoading ? (
                <div>Đang tải bài viết</div>
            ) : postError ? (
                <div>{postError}</div>
            ) : posts.length === 0 ? (
                <div>Chưa có bài viết</div>
            ) : (
                <Fragment>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    <h1
                        ref={setElement}
                        style={{
                            width: '100%',
                            backgroundColor: 'red',
                            fontSize: '50px',
                        }}
                    >
                        End of page
                    </h1>
                </Fragment>
            )}
        </div>
    );
};

export default PostList;
