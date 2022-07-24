import React from 'react';
import { IoHomeOutline, IoMusicalNotes } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { BiCopyright } from 'react-icons/bi';
import { CgHashtag } from 'react-icons/cg';
import routes from '../../../routes/routes';
import SidebarMenu from './SidebarMenu';
import { AccountItem, Button } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { login } from '../../../features/authSlice';
import { IMAGES } from '../../../constants/constants';
import SidebarDiscoverCard from './SidebarDiscoverCard';

const Sidebar: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
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
    const accounts = [
        { name: 'Raiden Shogun', usename: 'raiden.shogun', image: IMAGES.raiden },
        { name: 'Yae Miko', usename: 'yae.miko', image: IMAGES.yae },
        { name: 'Angry Yae', usename: 'angry.yae', image: IMAGES.angryYae },
        { name: 'Paimon', usename: 'paimon', image: IMAGES.paimon },
        { name: 'Raiden Yae', usename: 'raiden.yae', image: IMAGES.raidenYae },
    ];
    const discover = [
        { name: 'Những Gì Anh Nói - BOZITT', icon: <IoMusicalNotes size={16} /> },
        { name: 'Suýt Nữa Thì - Andiez', icon: <IoMusicalNotes size={16} /> },
        { name: 'Mãi Chẳng Thuộc về nhau - BOZITT', icon: <IoMusicalNotes size={16} /> },
        { name: 'genshinimpact', icon: <CgHashtag size={16} /> },
        { name: 'suthatmoingay', icon: <CgHashtag size={16} /> },
        { name: 'warframe', icon: <CgHashtag size={16} /> },
    ];

    return (
        <div className='h-screen pr-2 fixed top-[65px] max-w-[356px] overflow-scroll'>
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
                        border-y-gray012'
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
                {accounts.map((account, index) => (
                    <AccountItem
                        key={index}
                        name={account.name}
                        username={account.usename}
                        image={account.image}
                        small={true}
                    />
                ))}
                <p
                    className='text-primary font-[14px] px-2 cursor-pointer font-semibold 
                        mb-[20px]'
                >
                    {t('seeAll')}
                </p>
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
                <div className='mb-[75px]'>
                    <div className='flex items-center mt-[5px] mr-[6px]'>
                        <span>
                            <BiCopyright size={20} className='text-gray05' />
                        </span>
                        <p className='font-[12px] text-gray05 leading-[17px] font-semibold'>
                            Tất Quảng Kiệt - 2022
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
