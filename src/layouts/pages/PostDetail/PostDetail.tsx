import classNames from 'classnames/bind';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);

const PostDetail: React.FC = () => {
    const { id } = useParams();

    return (
        <div className={cx('container')}>
            <div className={cx('post-content')}>
                <h1>Post Id: {id}</h1>
            </div>
            <div className={cx('post-detail')}>
                <h1>Detail section</h1>
            </div>
        </div>
    );
};

export default PostDetail;
