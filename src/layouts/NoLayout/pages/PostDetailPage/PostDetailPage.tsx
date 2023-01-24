import { HeartIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import AccountInfo from 'components/AccountInfo/AccountInfo';
import { POST_TYPE } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { findPostById } from 'redux/reducers/postSlice';
import numberFormat from 'utils/numberFormat';
import AddComment from './components/AddComment/AddComment';
import CommentList from './components/CommentList/CommentList';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

const PostDetailPage: React.FC = () => {
    const { id } = useParams();

    const { currentUser } = useAppSelector((state) => state.auth);
    const { selectedPost, postLoading, postError } = useAppSelector(
        (state) => state.posts,
    );
    const dispatch = useAppDispatch();

    const [userLikePostStatus, setUserLikePostStatus] = useState(false);

    useEffect(() => {
        if (!id || !currentUser) return;

        const postId = parseInt(id);
        dispatch(findPostById(postId))
            .unwrap()
            .then((result) => {
                const currentUserLikePost = result.userLikePostList.filter(
                    (user) => user.id === currentUser.id,
                )[0];
                if (currentUserLikePost)
                    setUserLikePostStatus(currentUserLikePost.likeStatus);
            });
    }, [currentUser, dispatch, id]);

    // Update total comments in 1 post after create new comment
    // useEffect(() => {
    //     if (id === undefined) return;

    //     const selectedId = parseInt(id);
    //     dispatch(findPostByIdAPI(selectedId));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [comments]);

    return (
        <Fragment>
            {postLoading ? (
                <h1>Đang tải bài viết...</h1>
            ) : postError ? (
                <h1>{postError}</h1>
            ) : (
                <div className={cx('container')}>
                    {selectedPost.postTypeId === POST_TYPE.TEXT ? null : (
                        <div className={cx('post-content')}>
                            {selectedPost.postTypeId === POST_TYPE.IMAGE ? (
                                <div
                                    className={cx('content')}
                                    style={{
                                        backgroundImage: `url(${selectedPost.postUrl})`,
                                    }}
                                ></div>
                            ) : null}
                            {selectedPost.postTypeId === POST_TYPE.VIDEO ? (
                                <ReactPlayer
                                    width='400px'
                                    url={selectedPost.postUrl}
                                    controls
                                />
                            ) : null}
                        </div>
                    )}
                    <div className={cx('post-detail')}>
                        <AccountInfo
                            firstName={selectedPost.userPostDetail.firstName}
                            lastName={selectedPost.userPostDetail.lastName}
                            avatar={selectedPost.userPostDetail.avatar}
                            username={selectedPost.userPostDetail.username}
                            padding={true}
                            tick={selectedPost.userPostDetail.tick}
                        />
                        <p className={cx('caption')}>{selectedPost.caption}</p>
                        <div className={cx('like-comment-container')}>
                            <div
                                className={cx('icon-button', {
                                    userLikePost: userLikePostStatus,
                                })}
                            >
                                <HeartIcon />
                                {numberFormat.format(selectedPost.totalLikes)} lượt thích
                            </div>
                            <div className={cx('icon-button')}>
                                <AiOutlineComment />
                                {numberFormat.format(selectedPost.totalComments)} bình
                                luận
                            </div>
                        </div>
                        <div className={cx('comment-list')}>
                            {selectedPost.totalComments === 0 ? (
                                <h1>Chưa có bình luận</h1>
                            ) : (
                                <CommentList
                                    userIdInPost={selectedPost.userPostDetail.id}
                                    postId={selectedPost.id}
                                />
                            )}
                        </div>
                        <AddComment postId={parseInt(id!)} />
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default PostDetailPage;
