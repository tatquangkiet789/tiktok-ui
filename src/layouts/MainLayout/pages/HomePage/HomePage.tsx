import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import PostList from '../../../../components/PostList/PostList';
import { CURRENT_USER } from '../../../../constants/constants';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { IPost } from '../../../../models/post';
import { IUser } from '../../../../models/user';
import { findAllPosts } from '../../../../redux/reducers/postSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    const { posts } = useAppSelector((state) => state.posts);
    const dispatch = useAppDispatch();

    const testUser: IUser = {
        firstName: 'Thu',
        lastName: 'Nguyễn Hoài',
        avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1670081326/hoai-thu_f2ccf4.png',
        email: 'nhoxby159@gmail.com',
        tick: true,
        username: 'thu.nguyenhoai',
        userRoleId: 2,
        dateOfBirth: new Date(),
        createdDate: new Date(),
    };
    const items: IPost[] = [
        {
            id: 1,
            caption: 'Đây là bài post có chứa hình',
            active: true,
            likes: 1000,
            postUrl:
                'https://res.cloudinary.com/dnwauajh9/image/upload/v1670081326/ha-vi_gveirh.png',
            postTypeId: 1,
            users: testUser,
        },
        {
            id: 2,
            caption: 'Đây là bài post có chứa video',
            active: true,
            likes: 1000,
            postUrl:
                'https://res.cloudinary.com/dnwauajh9/video/upload/v1660552944/testing_filiqb.mp4',
            postTypeId: 2,
            users: testUser,
        },
        {
            id: 3,
            caption: 'Đây là bài post chỉ chứa mỗi caption',
            active: true,
            likes: 1000,
            postTypeId: 3,
            users: testUser,
        },
    ];

    useEffect(() => {
        dispatch(findAllPosts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            {/* <PostList posts={posts} /> */}
            <PostList posts={items} />
        </div>
    );
};

export default HomePage;
