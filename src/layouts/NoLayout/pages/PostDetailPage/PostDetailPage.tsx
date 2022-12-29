import classNames from 'classnames/bind';
import { POST_TYPE } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { findAllCommentsByPostId } from 'redux/reducers/commentSlice';
import { findPostById, findPostByIdAPI } from 'redux/reducers/postSlice';
import CommentList from './components/CommentList/CommentList';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

const PostDetailPage: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { selectedPost, posts } = useAppSelector((state) => state.posts);
    const { comments, commentLoading } = useAppSelector((state) => state.comments);

    useEffect(() => {
        if (id === undefined) return;

        const selectedId = parseInt(id);
        if (posts.length === 0) {
            dispatch(findPostByIdAPI(selectedId));
        } else {
            dispatch(findPostById(selectedId));
        }
        dispatch(findAllCommentsByPostId(selectedId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!selectedPost) return <h1>Loading...</h1>;

    return (
        <div className={cx('container')}>
            {selectedPost.postTypeId === POST_TYPE.TEXT ? null : (
                <div className={cx('post-content')}>
                    {selectedPost.postTypeId === POST_TYPE.IMAGE ? (
                        <div
                            className={cx('content')}
                            style={{ backgroundImage: `url(${selectedPost.postUrl})` }}
                        ></div>
                    ) : null}
                    {selectedPost.postTypeId === POST_TYPE.VIDEO ? (
                        <ReactPlayer width='400px' url={selectedPost.postUrl} controls />
                    ) : null}
                </div>
            )}
            <div className={cx('post-detail')}>
                <div className={cx('user-container')}>
                    <img
                        className={cx('image')}
                        src={selectedPost.userDetail.avatar}
                        alt={`${selectedPost.userDetail.lastName} ${selectedPost.userDetail.firstName}`}
                    />
                    <div className={cx('username')}>
                        <p>{`${selectedPost.userDetail.lastName} ${selectedPost.userDetail.firstName}`}</p>
                        <span>2 giờ</span>
                    </div>
                </div>
                <p className={cx('caption')}>
                    {selectedPost.caption} Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Velit, ratione placeat. Voluptates odio dicta quo
                    earum illum eum neque atque eveniet magnam voluptatibus expedita, nemo
                    officiis necessitatibus vero obcaecati accusamus.{' '}
                </p>
                <div>
                    <div>{selectedPost.likes} lượt thích</div>
                    <div>{selectedPost.comments} bình luận</div>
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
