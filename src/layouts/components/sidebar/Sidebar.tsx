import React, { useEffect } from 'react';
import { IoHomeOutline, IoMusicalNotes } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { CgHashtag } from 'react-icons/cg';
import routes from '../../../routes/routes';
import SidebarMenu from './SidebarMenu';
import { AccountItem, Button } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { login } from '../../../features/authSlice';
import { IMAGES } from '../../../constants/constants';
import SidebarDiscoverCard from './SidebarDiscoverCard';
import { fetchAllUsers, sliceFiveItems } from '../../../features/userSlice';

const Sidebar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const { users, loading, error } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const sidebarMenuItems = [
        { to: `${routes.home}`, text: t('forYou'), icon: <IoHomeOutline size={25} /> },
        {
            to: `${routes.following}`,
            text: t('following'),
            icon: <AiOutlineUsergroupDelete size={25} />,
        },
        {
            to: `/${routes.live}`,
            text: t('live').toUpperCase(),
            icon: <VscDeviceCameraVideo size={25} />,
        },
    ];
    const discover = [
        { name: 'Những Gì Anh Nói - BOZITT', icon: <IoMusicalNotes size={16} /> },
        { name: 'Suýt Nữa Thì - Andiez', icon: <IoMusicalNotes size={16} /> },
        { name: 'Mãi Chẳng Thuộc về nhau - BOZITT', icon: <IoMusicalNotes size={16} /> },
        { name: 'genshinimpact', icon: <CgHashtag size={16} /> },
        { name: 'suthatmoingay', icon: <CgHashtag size={16} /> },
        { name: 'warframe', icon: <CgHashtag size={16} /> },
    ];

    useEffect(() => {
        dispatch(fetchAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <div className='mt-[20px] pb-2'>
                {sidebarMenuItems.map((item, index) => (
                    <SidebarMenu
                        key={index}
                        to={item.to}
                        text={item.text}
                        icon={item.icon}
                    />
                ))}
            </div>

            {currentUser ? (
                <></>
            ) : (
                <div
                    className='pl-2 pt-[20px] pb-[20px] border-y-[0.5px] 
                        border-y-gray012 w-[340px]'
                >
                    <p className='text-[16px] leading-[22px] text-gray05'>
                        {t('logInToFollowCreatorsLikeVideosAndViewComments')}
                    </p>
                    <div className='mt-[20px]'>
                        <Button
                            text={t('login')}
                            type='outlined'
                            size='lg'
                            onClick={() => dispatch(login())}
                        />
                    </div>
                </div>
            )}

            <div>
                <p
                    className='text-gray075 px-2 text-[14px] leading-[20px] mb-2 
                    font-semibold mt-[20px]'
                >
                    {t('suggestedAccounts')}
                </p>
                {users.map(({ name, id, username }) => (
                    <AccountItem
                        key={id}
                        name={name}
                        username={username}
                        image={IMAGES.angryYae}
                    />
                ))}
                {users.length > 5 ? (
                    <p
                        className='text-primary font-[14px] px-2 cursor-pointer 
                        font-semibold mb-[20px]'
                        onClick={() => dispatch(sliceFiveItems())}
                    >
                        {t('seeLess')}
                    </p>
                ) : (
                    <p
                        className='text-primary font-[14px] px-2 cursor-pointer 
                            font-semibold mb-[20px]'
                        onClick={() => dispatch(sliceFiveItems())}
                    >
                        {t('seeAll')}
                    </p>
                )}
                <div
                    className='pl-2 pt-[20px] pb-[20px] border-y-[0.5px] 
                    border-y-gray012'
                >
                    <p
                        className='font-[14px] font-semibold text-gray05 
                        leading-[20px] pb-4'
                    >
                        {t('discover')}
                    </p>
                    <div className='flex flex-wrap'>
                        {discover.map((item, index) => (
                            <SidebarDiscoverCard
                                key={index}
                                name={item.name}
                                icon={item.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
