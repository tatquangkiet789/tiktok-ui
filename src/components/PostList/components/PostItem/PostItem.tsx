import classNames from 'classnames/bind';
import React from 'react';
import { CURRENT_USER } from '../../../../constants/constants';
import Button from '../../../Button/Button';
import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

const PostItem: React.FC = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('user-container')}>
                <div className={cx('user-info')}>
                    <img
                        className={cx('image')}
                        src={CURRENT_USER.avatar}
                        alt={CURRENT_USER.name}
                    />
                    <div className={cx('post-detail')}>
                        <p>{CURRENT_USER.name}</p>
                        <span>2 giờ</span>
                    </div>
                </div>
                <Button text='Kết bạn' type='outlined' size='sm' />
            </div>
            <div className={cx('post-caption')}>
                There are many variations of passages of Lorem Ipsum available, but the
                majority have suffered alteration in some form, by injected humour, or
                randomised words which don't look even slightly believable. If you are
                going to use a passage of Lorem Ipsum, you need to be sure there isn't
                anything embarrassing hidden in the middle of text.
            </div>
            <div>
                <img
                    className={cx('post-content')}
                    src={CURRENT_USER.avatar}
                    alt={CURRENT_USER.name}
                />
            </div>
            <div className={cx('like')}>
                <span>2.1K</span>
                <p className={cx('comments')}>95 bình luận</p>
                <p>23 lượt chia sẻ</p>
            </div>
            <div className={cx('action-buttons')}>
                <button>Thích</button>
            </div>
        </div>
    );
};

export default PostItem;
