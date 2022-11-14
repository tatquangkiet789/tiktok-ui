import React from 'react';
import routes from '../../../routes/routes';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as FollowingIcon } from '../../../assets/icons/following.svg';
import { ReactComponent as LiveIcon } from '../../../assets/icons/live.svg';
import SidebarMenu from './SidebarMenu/SidebarMenu';
import { USERS } from '../../../constants/constants';
import Button from '../../../components/Button/Button';
import AccountItem from '../../../components/AccoutItem/AccountItem';

const cx = classNames.bind(styles);

const Sidebar: React.FC = () => {
    const sidebarMenuItems = [
        { to: `${routes.home}`, text: 'Dành cho bạn', icon: <HomeIcon /> },
        {
            to: `${routes.following}`,
            text: 'Đang Follow',
            icon: <FollowingIcon />,
        },
        {
            to: `/${routes.live}`,
            text: 'Live'.toUpperCase(),
            icon: <LiveIcon />,
        },
    ];
    const users = [...USERS];
    // const discover = [
    //     { name: 'Những Gì Anh Nói - BOZITT', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'Suýt Nữa Thì - Andiez', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'Mãi Chẳng Thuộc về nhau - BOZITT', icon: <IoMusicalNotes size={16} /> },
    //     { name: 'genshinimpact', icon: <CgHashtag size={16} /> },
    //     { name: 'suthatmoingay', icon: <CgHashtag size={16} /> },
    //     { name: 'warframe', icon: <CgHashtag size={16} /> },
    // ];

    return (
        // <React.Fragment>
        //     <div className='mt-[20px] pb-2'>
        //         {sidebarMenuItems.map((item, index) => (
        //             <SidebarMenu
        //                 key={index}
        //                 to={item.to}
        //                 text={item.text}
        //                 icon={item.icon}
        //             />
        //         ))}
        //     </div>

        //     {currentUser ? (
        //         <></>
        //     ) : (
        //         <div
        //             className='pl-2 pt-[20px] pb-[20px] border-y-[0.5px]
        //                 border-y-gray012 w-[340px]'
        //         >
        //             <p className='text-[16px] leading-[22px] text-gray05'>
        //                 {t('logInToFollowCreatorsLikeVideosAndViewComments')}
        //             </p>
        //             <div className='mt-[20px]'>
        //                 <Button
        //                     text={t('login')}
        //                     type='outlined'
        //                     size='lg'
        //                     onClick={() => dispatch(login())}
        //                 />
        //             </div>
        //         </div>
        //     )}

        //     <div>
        //         <p
        //             className='text-gray075 px-2 text-[14px] leading-[20px] mb-2
        //             font-semibold mt-[20px]'
        //         >
        //             {t('suggestedAccounts')}
        //         </p>
        //         {/* {users.map(({ name, id, username }) => (
        //             <AccountItem
        //                 key={id}
        //                 name={name}
        //                 username={username}
        //                 image={IMAGES.angryYae}
        //             />
        //         ))} */}
        //         {/* {users.length > 5 ? (
        //             <p
        //                 className='text-primary font-[14px] px-2 cursor-pointer
        //                 font-semibold mb-[20px]'
        //                 onClick={() => dispatch(sliceFiveItems())}
        //             >
        //                 {t('seeLess')}
        //             </p>
        //         ) : (
        //             <p
        //                 className='text-primary font-[14px] px-2 cursor-pointer
        //                     font-semibold mb-[20px]'
        //                 onClick={() => dispatch(sliceFiveItems())}
        //             >
        //                 {t('seeAll')}
        //             </p>
        //         )} */}
        //         <div
        //             className='pl-2 pt-[20px] pb-[20px] border-y-[0.5px]
        //             border-y-gray012'
        //         >
        //             <p
        //                 className='font-[14px] font-semibold text-gray05
        //                 leading-[20px] pb-4'
        //             >
        //                 {t('discover')}
        //             </p>
        //             <div className='flex flex-wrap'>
        //                 {discover.map((item, index) => (
        //                     <SidebarDiscoverCard
        //                         key={index}
        //                         name={item.name}
        //                         icon={item.icon}
        //                     />
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </React.Fragment>
        <div className={cx('container')}>
            {sidebarMenuItems.map((item, index) => (
                <SidebarMenu key={index} to={item.to} text={item.text} icon={item.icon} />
            ))}
            <div className={cx('login')}>
                <p>Đăng nhập để follow các tác giả, thích video và xem bình luận</p>
                <Button text='Đăng nhập' type='outlined' size='lg' />
            </div>
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
        </div>
    );
};

export default Sidebar;
