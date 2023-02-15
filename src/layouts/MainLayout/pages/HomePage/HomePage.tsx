import classNames from 'classnames/bind';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { findAllPosts } from 'redux/reducers/postSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    const { posts, postLoading, postError, hasNextPage } = useAppSelector(
        (state) => state.posts,
    );
    const dispatch = useAppDispatch();
    console.log('POST LIST: ', posts);
    console.log(`Has Next Page: ${hasNextPage}`);

    const [page, setPage] = useState(1);
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) setPage((prev) => prev + 1);
        }),
    );

    useEffect(() => {
        if (posts.length !== 0) return;
        console.log('Initial Load');
        dispatch(findAllPosts({ page: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (page === 1) return;
        console.log(`Load by page: ${page}`);
        dispatch(findAllPosts({ page: page }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const currentElement = element;
        const currentObserver = observer.current;

        if (!currentElement) return;

        currentObserver.observe(currentElement);

        if (!hasNextPage) {
            console.log(`Unobserve - hasNextPage: ${hasNextPage}`);
            currentObserver.unobserve(currentElement);
        }

        return () => {
            console.log('Unobserve');
            currentObserver.unobserve(currentElement);
        };
    }, [element, hasNextPage]);

    return (
        <div className={cx('container')}>
            {postLoading ? (
                <div>Đang tải bài viết</div>
            ) : postError ? (
                <div>{postError}</div>
            ) : (
                <Fragment>
                    <PostList postList={posts} />
                    <div
                        ref={setElement}
                        style={{ width: '100%', backgroundColor: 'red', padding: '20px' }}
                    >
                        End of page
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default HomePage;
