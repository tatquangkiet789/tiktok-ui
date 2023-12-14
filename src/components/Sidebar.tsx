// import { FriendsIcon, HomeIcon, TickIcon, WatchIcon } from 'assets/icons';
// import classNames from 'classnames/bind';
// import { useAppSelector } from 'hooks/useAppSelector';
// import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { findTop10SuggestedUsers } from 'redux/reducers/userSlice';
// import styles from './Sidebar.module.scss';
// import SidebarMenu from '../layouts/components/Sidebar/components/SidebarMenu/SidebarMenu';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import AccountItemPlaceHolder from 'components/ui/AccountItemPlaceHolder/AccountItemPlaceHolder';
// import AccountItem from 'components/ui/AccoutItem/AccountItem';
// import Button from 'components/ui/Button/Button';
// import { IUser } from 'features/users/models/userModel';
// import { APP_ROUTES } from 'routes/routes';

// const cx = classNames.bind(styles);

// const Sidebar: React.FC = () => {
//     const { currentUser } = useAppSelector((state) => state.auth);
//     // const { users, loading, error } = useAppSelector((state) => state.users);
//     const dispatch = useAppDispatch();

//     const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);

//     const sidebarMenuItems = [
//         { to: `${APP_ROUTES.HOME}`, text: 'Dành cho bạn', icon: <HomeIcon /> },
//         {
//             to: `${APP_ROUTES.FRIENDS}`,
//             text: 'Bạn bè',
//             icon: <FriendsIcon />,
//         },
//         {
//             to: `${APP_ROUTES.WATCH}`,
//             text: 'Watch',
//             icon: <WatchIcon />,
//         },
//     ];

//     useEffect(() => {
//         dispatch(findTop10SuggestedUsers())
//             .unwrap()
//             .then((result) => {
//                 if (currentUser)
//                     return setSuggestedUsers(
//                         result.filter((user) => user.id !== currentUser.id),
//                     );

//                 return setSuggestedUsers(result);
//             });
//     }, [currentUser, dispatch]);

//     const handleShowLessSuggestedUsers = () => {
//         setSuggestedUsers((prev) => {
//             return [...prev].slice(0, 5);
//         });
//     };

//     const handleShowAllSuggestedUsers = () => {
//         // setSuggestedUsers(users!);
//     };

//     const renderSuggestedUsers = () => {
//         // if (loading) return <AccountItemPlaceHolder instances={3} />;
//         // if (error) return <div>{error}</div>;

//         return (
//             <>
//                 {suggestedUsers.map(
//                     ({ firstName, lastName, id, username, avatar, tick }) => (
//                         <AccountItem
//                             key={id}
//                             firstName={firstName}
//                             lastName={lastName}
//                             username={username}
//                             avatar={avatar}
//                             tick={tick}
//                         />
//                     ),
//                 )}
//             </>
//         );
//     };

//     return (
//         <div className={cx('container')}>
//             {currentUser ? (
//                 <Link to={`/${currentUser.username}`} className={cx('user-detail-link')}>
//                     <img
//                         src={currentUser.avatar}
//                         className={cx('image')}
//                         alt='User Avatar'
//                     />
//                     <p>
//                         {currentUser.lastName} {currentUser.firstName}
//                     </p>
//                     {currentUser.tick ? <TickIcon /> : null}
//                 </Link>
//             ) : null}
//             {sidebarMenuItems.map((item, index) => (
//                 <SidebarMenu key={index} to={item.to} text={item.text} icon={item.icon} />
//             ))}
//             {currentUser ? null : (
//                 <div className={cx('login')}>
//                     <p>Đăng nhập để follow các tác giả, thích video và xem bình luận</p>
//                     <Button
//                         text='Đăng nhập'
//                         variant='outlined'
//                         size='lg'
//                         to={APP_ROUTES.LOGIN}
//                     />
//                 </div>
//             )}
//             <p className={cx('suggested-accounts')}>Tài khoản được đề xuất</p>
//             {renderSuggestedUsers()}
//             <div className={cx('see-all-button')}>
//                 {suggestedUsers?.length > 5 ? (
//                     <p onClick={handleShowLessSuggestedUsers}>Ẩn bớt</p>
//                 ) : (
//                     <p onClick={handleShowAllSuggestedUsers}>Xem tất cả</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
export default function Sidebar() {
    return <>Sidebar</>;
}
