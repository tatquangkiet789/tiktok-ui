import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import routes from '../../../routes/routes';
import SidebarMenu from './SidebarMenu';
import { AccountItem, Button } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { login } from '../../../features/authSlice';

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

    return (
        <div className='h-screen pr-2 fixed top-[65px] max-w-[356px] overflow-y-scroll'>
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
                    className='pl-2 pt-[20px] pb-[24px] border-y-[0.5px] 
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
                    font-semibold mt-[24px]'
                >
                    {t('suggestedAccounts')}
                </p>
                <AccountItem small={true} />
            </div>
        </div>
    );
};

export default Sidebar;
