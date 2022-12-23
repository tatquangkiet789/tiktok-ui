import classNames from 'classnames/bind';
import React from 'react';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

const CommentItem: React.FC = () => {
    return <div className={cx('container')}>CommentItem</div>;
};

export default CommentItem;
