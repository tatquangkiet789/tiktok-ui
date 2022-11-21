import React from 'react';
import routes from '../../../routes/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as FriendsIcon } from '../../../assets/icons/friends.svg';
import { ReactComponent as WatchIcon } from '../../../assets/icons/watch.svg';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import { USERS } from '../../../constants/constants';
import Button from '../../../components/Button/Button';
import AccountItem from '../../../components/AccoutItem/AccountItem';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../slices/authSlice';
import { showAllSuggestedUsers, showLessSuggestedUser } from '../../../slices/userSlice';

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { users } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
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
    // const discover = [
    //     { name: 'Những Gì Anh Nói - BOZITT', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'Suýt Nữa Thì - Andiez', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'Mãi Chẳng Thuộc về nhau - BOZITT', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'genshinimpact', icon: <CgHashtag size={16} /> },
    //     { name: 'suthatmoingay', icon: <CgHashtag size={16} /> },
    //     { name: 'warframe', icon: <CgHashtag size={16} /> },
    // ];

    const handleLoginUser = () => {
        dispatch(loginUser());
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
                    <p>{currentUser.name}</p>
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
            {users.map(({ name, username, avatar, tick }, index) => (
                <AccountItem
                    key={index}
                    name={name}
                    username={username}
                    avatar={avatar}
                    tick={tick}
                />
            ))}
            <div className={cx('see-all-button')}>
                {users.length > 4 ? (
                    <p onClick={() => dispatch(showLessSuggestedUser())}>Ẩn bớt</p>
                ) : (
                    <p onClick={() => dispatch(showAllSuggestedUsers())}>Xem tất cả</p>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
