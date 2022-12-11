import classNames from 'classnames/bind';
import React, { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { findPostById } from '../../../redux/reducers/postSlice';
import styles from './PostDetail.module.scss';

const cx = classNames.bind(styles);

const PostDetail: React.FC = () => {
    const { id } = useParams();

    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(findPostById(parseInt(id!)));
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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

export default memo(PostDetail);
