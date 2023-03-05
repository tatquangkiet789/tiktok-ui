import { HeartIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import AccountInfo from 'components/AccountInfo/AccountInfo';
import Button from 'components/Button/Button';
import { POST_TYPE, SOCKET_EVENT } from 'constants/constants';
import routes from 'constants/routes';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import socketClient from 'libs/socketClient';
import { ISendNotification } from 'models/notificationDTO';
import { IPost } from 'models/post';
import React, { memo, useEffect, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    likePostById,
    unlikePostById,
    userLikePost,
    userUnlikePost,
} from 'redux/reducers/postSlice';
import { numberFormat } from 'utils/format';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

interface IPostItemProps {
    post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
    const {
        id,
        caption,
        postUrl,
        postTypeId,
        totalComments,
        totalLikes,
        userLikePostList,
        userPostDetail,
        createdDate,
    } = post;

    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [likePost, setLikePost] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // if user is not login then not show like status
        if (!currentUser) return;
        // if nobody likes that post then not show like status
        if (!userLikePostList) return;

        const currentUserLikePostDetail = userLikePostList.filter(
            (user) => user.id === currentUser.id,
        )[0];

        if (currentUserLikePostDetail) setLikePost(currentUserLikePostDetail.likeStatus);
    }, [currentUser, id, userLikePostList]);

    const handleLikeAndUnlikePost = () => {
        if (!currentUser) {
            return navigate(routes.login, {
                replace: true,
                state: { from: location },
            });
        }
        const postId = id as number;
        const { accessToken } = currentUser;
        if (!likePost)
            return dispatch(likePostById({ postId: postId, accessToken }))
                .unwrap()
                .then(() => {
                    setLikePost(true);
                    dispatch(userLikePost(postId));
                    const notification: ISendNotification = {
                        senderName: currentUser.username,
                        receiverName: userPostDetail.username,
                        notificationType: 'like',
                        postId: postId,
                    };
                    socketClient.emit(SOCKET_EVENT.SEND_NOTIFICATION, notification);
                });

        dispatch(unlikePostById({ postId: postId, accessToken }))
            .unwrap()
            .then(() => {
                setLikePost(false);
                dispatch(userUnlikePost(postId));
            });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('user-container')}>
                <div>
                    <AccountInfo
                        avatar={userPostDetail.avatar}
                        firstName={userPostDetail.firstName}
                        lastName={userPostDetail.lastName}
                        username={userPostDetail.username}
                        padding={false}
                        tick={userPostDetail.tick}
                        createdDate={createdDate}
                    />
                </div>
                <Button text='Kết bạn' variant='outlined' size='sm' />
            </div>
            <div className={cx('post-caption')}>{caption}</div>
            <div className={cx('post-content-container')}>
                {postTypeId === POST_TYPE.IMAGE ? (
                    <img className={cx('post-content')} src={postUrl} alt='Post URL' />
                ) : null}
                {postTypeId === POST_TYPE.VIDEO ? (
                    <ReactPlayer width='400px' url={postUrl} controls />
                ) : null}
            </div>
            <div className={cx('like')}>
                <span>{numberFormat.format(totalLikes)} lượt thích</span>
                <p className={cx('comments')}>
                    {numberFormat.format(totalComments)} bình luận
                </p>
            </div>
            <div className={cx('action-buttons')}>
                <div
                    className={cx('icon-button', {
                        userLikePost: likePost,
                    })}
                    onClick={handleLikeAndUnlikePost}
                >
                    <HeartIcon />
                </div>
                <Link className={cx('icon-button')} to={`/posts/${id}`}>
                    <span className={cx('icon')}>
                        <AiOutlineComment size={30} />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default memo(PostItem);
