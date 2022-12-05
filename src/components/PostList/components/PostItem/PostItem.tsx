import classNames from 'classnames/bind';
import React, { memo, useState } from 'react';
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import { IPost } from '../../../../models/post';
import formatter from '../../../../utils/formatNumber';
import Button from '../../../Button/Button';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

interface IPostItemProps {
    post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
    const { caption, postUrl, likes, users, postTypeId } = post;
    const [openSelectedPost, setOpenSelectedPost] = useState(false);
    const [likePost, setLikePost] = useState(false);

    const handleOpenSelectedPost = () => {
        setOpenSelectedPost(true);
        toast.success('Đã bấm vào icon bình luận');
    };

    const handleLikePost = () => {
        setLikePost((prev) => {
            if (prev === true) {
                toast.warning('Đã không thích bài viết');
                return !prev;
            } else {
                toast.success('Đã thích bài viết');
                return !prev;
            }
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('user-container')}>
                <div className={cx('user-info')}>
                    <img
                        className={cx('image')}
                        src={users.avatar}
                        alt={`${users.lastName} ${users.firstName}`}
                    />
                    <div className={cx('post-detail')}>
                        <p>{`${users.lastName} ${users.firstName}`}</p>
                        <span>2 giờ</span>
                    </div>
                </div>
                <Button text='Kết bạn' type='outlined' size='sm' />
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
                <div className={cx('icon-button')} onClick={handleLikePost}>
                    <span
                        className={cx('icon', {
                            active: likePost,
                        })}
                    >
                        <AiOutlineHeart size={30} color={likePost ? 'red' : ''} />
                    </span>
                </div>
                <div className={cx('icon-button')} onClick={handleOpenSelectedPost}>
                    <span className={cx('icon')}>
                        <AiOutlineComment size={30} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(PostItem);
