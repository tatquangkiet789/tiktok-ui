import classNames from 'classnames/bind';
import React from 'react';
import PostItem from './components/PostItem/PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

const PostList: React.FC = () => {
    return (
        <div className={cx('container')}>
            <PostItem />
            <PostItem />
            <PostItem />
        </div>
    );
};

export default PostList;
