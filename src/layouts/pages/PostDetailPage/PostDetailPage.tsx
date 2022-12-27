import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import { POST_TYPE } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findAllCommentsByPostId } from 'redux/reducers/commentSlice';
import { findPostById, findPostByIdAPI } from 'redux/reducers/postSlice';
import CommentList from './components/CommentList/CommentList';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

const PostDetailPage: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { posts, selectedPost, postLoading } = useAppSelector((state) => state.posts);
    const { comments, commentLoading } = useAppSelector((state) => state.comments);

    useEffect(() => {
        if (id === undefined) return;

        const selectedId = parseInt(id);
        if (posts.length === 0) {
            // Get selected post by API
            dispatch(findPostByIdAPI(selectedId));
        } else {
            // Get selected post from redux store
            dispatch(findPostById(selectedId));
        }
        dispatch(findAllCommentsByPostId(selectedId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (postLoading) return <h1>Loading...</h1>;

    return (
        <div className={cx('container')}>
            {selectedPost.postTypeId === POST_TYPE.TEXT ? null : (
                <div className={cx('post-content')}>
                    <h1>Post Id: {id}</h1>
                </div>
            )}
            <div className={cx('post-detail')}>
                <div className={cx('user-container')}>
                    <img
                        className={cx('image')}
                        src={selectedPost.userDetail.avatar}
                        alt={`${selectedPost.userDetail.lastName} ${selectedPost.userDetail.firstName}`}
                    />
                    <div className={cx('post-detail')}>
                        <p>{`${selectedPost.userDetail.lastName} ${selectedPost.userDetail.firstName}`}</p>
                        <span>2 giờ</span>
                    </div>
                </div>
                <div className={cx('comment-list')}>
                    {commentLoading ? (
                        <h1>Loading</h1>
                    ) : comments.length === 0 ? (
                        <h1>Không có bình luận</h1>
                    ) : (
                        <CommentList comments={comments} />
                    )}
                </div>
                <div className={cx('comment-input')}>
                    <input
                        type='text'
                        className={cx('input')}
                        placeholder='Thêm bình luận...'
                    />
                    <button className={cx('add-comment-button')}>Đăng</button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailPage;
