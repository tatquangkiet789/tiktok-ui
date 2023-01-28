import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IPost } from 'models/post';
import { FC, Fragment, memo, useEffect, useState } from 'react';
import PostItem from './components/PostItem/PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface IPostListProps {
    postList: IPost[];
}

const PostList: FC<IPostListProps> = ({ postList }) => {
    // const [accessToken, setAccessToken] = useState('');

    // useEffect(() => {
    //     if (!currentUser) return;
    //     if (currentUser.username === username) {
    //         setAuthor(true);
    //         setAccessToken(currentUser.accessToken);
    //     }
    // }, [currentUser, username]);

    return (
        <div className='container'>
            {postList.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default memo(PostList);
