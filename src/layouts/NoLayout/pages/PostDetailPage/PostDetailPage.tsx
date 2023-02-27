import { CloseIcon, HeartIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import AccountInfo from 'components/AccountInfo/AccountInfo';
import { POST_TYPE } from 'constants/constants';
import routes from 'constants/routes';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import {
    findPostById,
    likePostById,
    unlikePostById,
    userLikePost,
    userUnlikePost,
} from 'redux/reducers/postSlice';
import { numberFormat } from 'utils/format';
import AddComment from './components/AddComment/AddComment';
import CommentList from './components/CommentList/CommentList';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

const PostDetailPage: React.FC = () => {
    const { id } = useParams();

    const { currentUser } = useAppSelector((state) => state.auth);
    const { selectedPost, postError } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    const [userLikePostStatus, setUserLikePostStatus] = useState(false);

    useEffect(() => {
        if (!id || !currentUser) return;

        const postId = parseInt(id);
        dispatch(findPostById(postId))
            .unwrap()
            .then((result) => {
                const currentUserLikePost = result.userLikePostList.filter(
                    (user: any) => user.id === currentUser.id,
                )[0];
                if (currentUserLikePost)
                    setUserLikePostStatus(currentUserLikePost.likeStatus);
            });
    }, [currentUser, dispatch, id]);

    const handleLikeAndUnlikePost = () => {
        if (!id || !currentUser) return;

        const postId = parseInt(id);
        const { accessToken } = currentUser;
        if (!userLikePostStatus)
            return dispatch(likePostById({ postId: postId, accessToken: accessToken }))
                .unwrap()
                .then(() => {
                    setUserLikePostStatus(true);
                    dispatch(userLikePost(postId));
                    // socketClient.emit('sendNotification', {
                    //     senderName: currentUser.username,
                    //     receiverName: userPostDetail.username,
                    // });
                    // console.log({
                    //     senderName: currentUser.username,
                    //     receiverName: userPostDetail.username,
                    // });
                });

        dispatch(unlikePostById({ postId: postId, accessToken: accessToken }))
            .unwrap()
            .then(() => {
                setUserLikePostStatus(false);
                dispatch(userUnlikePost(postId));
            });
    };

    if (postError) return <h1>{postError}</h1>;

    return (
        <Fragment>
            {selectedPost && (
                <div
                    className={cx('container', {
                        text: selectedPost.postTypeId === POST_TYPE.TEXT,
                    })}
                >
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
                                <div className={cx('content')}>
                                    <ReactPlayer
                                        width='100%'
                                        height='100%'
                                        url={selectedPost.postUrl}
                                        controls
                                    />
                                </div>
                            ) : null}
                            <Link to={routes.home} className={cx('close-button')}>
                                <CloseIcon />
                            </Link>
                        </div>
                    )}
                    <div
                        className={cx('post-detail', {
                            text: selectedPost.postTypeId === POST_TYPE.TEXT,
                        })}
                    >
                        <AccountInfo
                            firstName={selectedPost.userPostDetail.firstName}
                            lastName={selectedPost.userPostDetail.lastName}
                            avatar={selectedPost.userPostDetail.avatar}
                            username={selectedPost.userPostDetail.username}
                            padding={true}
                            tick={selectedPost.userPostDetail.tick}
                            createdDate={selectedPost.createdDate}
                        />
                        <p className={cx('caption')}>{selectedPost.caption}</p>
                        <div className={cx('like-comment-container')}>
                            <div
                                className={cx('icon-button', {
                                    userLikePost: userLikePostStatus,
                                })}
                                onClick={handleLikeAndUnlikePost}
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
