import classNames from 'classnames/bind';
import React, { memo } from 'react';
import { IPost } from '../../../../models/post';
import styles from './SelectedPost.module.scss';

const cx = classNames.bind(styles);

interface ISelectedPostProps {
    selectedPost: IPost;
}

const SelectedPost: React.FC<ISelectedPostProps> = ({ selectedPost }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('post-content')}></div>
            <div className={cx('post-detail')}></div>
        </div>
    );
};

export default memo(SelectedPost);
