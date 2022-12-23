import classNames from 'classnames/bind';
import React from 'react';
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles);

const CommentList: React.FC = () => {
    return <div className={cx('container')}>CommentList</div>;
};

export default CommentList;
