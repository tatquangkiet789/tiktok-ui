import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IPost } from 'models/post';
import React, { memo, useEffect, useState } from 'react';
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { likePostById, unLikePostById } from 'redux/reducers/postSlice';
import routes from 'routes/routes';
import formatter from 'utils/formatNumber';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

interface IPostItemProps {
    post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
    const { id, caption, postUrl, likes, userDetail, postTypeId, likeDetailList } = post;

    const { currentUser, accessToken } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [likePost, setLikePost] = useState(false);

    useEffect(() => {
        if (!currentUser) return;

        if (!likeDetailList) return;

        const likeStatus = likeDetailList
            .filter((status) => status.postId === id)
            .find((status) => status.userLikeId === currentUser.id);

        if (likeStatus) setLikePost(likeStatus.like);
    }, [currentUser, id, likeDetailList]);

    const handleLikeAndUnlikePost = () => {
        const postId = id as number;
        if (!likePost) {
            dispatch(likePostById({ id: postId, accessToken }));
            return;
        }

        dispatch(unLikePostById({ id: postId, accessToken }));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('user-container')}>
                <div className={cx('user-info')}>
                    <img
                        className={cx('image')}
                        src={userDetail.avatar}
                        alt={`${userDetail.lastName} ${userDetail.firstName}`}
                    />
                    <div className={cx('post-detail')}>
                        <p>{`${userDetail.lastName} ${userDetail.firstName}`}</p>
                        <span>2 giờ</span>
                    </div>
                </div>
                <Button text='Kết bạn' variant='outlined' size='sm' />
            </div>
            <div className={cx('post-caption')}>{caption}</div>
            <div className={cx('post-content-container')}>
                {postTypeId === 1 ? (
                    <img className={cx('post-content')} src={postUrl} alt='Post URL' />
                ) : null}
                {postTypeId === 2 ? (
                    <ReactPlayer width='400px' url={postUrl} controls />
                ) : null}
            </div>
            <div className={cx('like')}>
                <span>{formatter.format(likes)} lượt thích</span>
                <p className={cx('comments')}>{formatter.format(1000)} bình luận</p>
            </div>
            <div className={cx('action-buttons')}>
                <div className={cx('icon-button')} onClick={handleLikeAndUnlikePost}>
                    <span className={cx('icon')}>
                        <AiOutlineHeart size={30} color={likePost ? 'red' : ''} />
                    </span>
                </div>
                <Link
                    className={cx('icon-button')}
                    to={routes.postDetail(userDetail.username, id!)}
                >
                    <span className={cx('icon')}>
                        <AiOutlineComment size={30} />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default memo(PostItem);