import classNames from 'classnames/bind';
import { IPost } from 'models/post';
import { FC, memo } from 'react';
import PostItem from './components/PostItem/PostItem';
import styles from './PostList.module.scss';

const cx = classNames.bind(styles);

interface IPostListProps {
    postList: IPost[];
}

const PostList: FC<IPostListProps> = ({ postList }) => {
    return (
        <div className={cx('container')}>
            {postList.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default memo(PostList);
