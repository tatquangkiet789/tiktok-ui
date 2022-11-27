import React, { useEffect, useState } from 'react';
import routes from '../../../routes/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as FriendsIcon } from '../../../assets/icons/friends.svg';
import { ReactComponent as WatchIcon } from '../../../assets/icons/watch.svg';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import Button from '../../../components/Button/Button';
import AccountItem from '../../../components/AccoutItem/AccountItem';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router-dom';
import { findTop10SuggestedUsers } from '../../../slices/userSlice';
import { User } from '../../../models/user';

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    console.log(users);

    const [suggestedUsers, SetSuggestedUsers] = useState<User[]>([...users]!);

    const sidebarMenuItems = [
        { to: `${routes.home}`, text: 'Dành cho bạn', icon: <HomeIcon /> },
        {
            to: `${routes.friends}`,
            text: 'Bạn bè',
            icon: <FriendsIcon />,
        },
        {
            to: `/${routes.watch}`,
            text: 'Watch',
            icon: <WatchIcon />,
        },
    ];

    useEffect(() => {
        if (users.length === 0) {
            dispatch(findTop10SuggestedUsers());
        }
        SetSuggestedUsers(users);
    }, [dispatch, users, users.length]);

    const handleLoginUser = () => {
        // dispatch(loginUser());
    };

    const handleShowLessSuggestedUsers = () => {
        SetSuggestedUsers((prev) => {
            return [...prev].slice(0, 4);
        });
    };

    const handleShowAllSuggestedUsers = () => {
        SetSuggestedUsers(users);
    };

    return (
        <div className={cx('container')}>
            {currentUser ? (
                <Link to={'/'} className={cx('user-detail-link')}>
                    <img
                        src={currentUser.avatar}
                        className={cx('image')}
                        alt='User Avatar'
                    />
                    <p>
                        {currentUser.lastName} {currentUser.firstName}
                    </p>
                </Link>
            ) : null}
            {sidebarMenuItems.map((item, index) => (
                <SidebarMenu key={index} to={item.to} text={item.text} icon={item.icon} />
            ))}
            {currentUser ? null : (
                <div className={cx('login')}>
                    <p>Đăng nhập để follow các tác giả, thích video và xem bình luận</p>
                    <Button
                        text='Đăng nhập'
                        type='outlined'
                        size='lg'
                        onClick={handleLoginUser}
                    />
                </div>
            )}
            <p className={cx('suggested-accounts')}>Tài khoản được đề xuất</p>
            {suggestedUsers.map(({ firstName, lastName, id, username, avatar, tick }) => (
                <AccountItem
                    key={id}
                    firstName={firstName}
                    lastName={lastName}
                    username={username}
                    avatar={avatar}
                    tick={tick}
                />
            ))}
            <div className={cx('see-all-button')}>
                {suggestedUsers.length > 4 ? (
                    <p onClick={handleShowLessSuggestedUsers}>Ẩn bớt</p>
                ) : (
                    <p onClick={handleShowAllSuggestedUsers}>Xem tất cả</p>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
