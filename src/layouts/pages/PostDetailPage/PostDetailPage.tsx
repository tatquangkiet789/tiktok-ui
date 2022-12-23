import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { findPostById } from 'redux/reducers/postSlice';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

const PostDetailPage: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const { selectedPost } = useAppSelector((state) => state.posts);

    useEffect(() => {
        const selectedId = parseInt(id!);
        if (selectedId !== selectedPost.id) dispatch(findPostById(selectedId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(selectedPost);

    return (
        <div className={cx('container')}>
            <div className={cx('post-content')}>
                <h1>Post Id: {id}</h1>
            </div>
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
                <div className={cx('comment-list')}></div>
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
