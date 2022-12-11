import classNames from 'classnames/bind';
import React, { memo, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IPost } from '../../models/post';
import PostItem from './components/PostItem/PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface IPostListProps {
    posts: IPost[];
}

const PostList: React.FC<IPostListProps> = ({ posts }) => {
    return (
        <div className={cx('container')}>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default memo(PostList);
