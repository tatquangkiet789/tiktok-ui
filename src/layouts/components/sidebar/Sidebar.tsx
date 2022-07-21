import React from 'react';
import { IoHomeOutline } from 'react-icons/io5';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import routes from '../../../routes/routes';
import SidebarMenu from './SidebarMenu';
import Button from '../../../components/Button';

const Sidebar: React.FC = () => {
    const sidebarMenuItems = [
        { to: `${routes.home}`, text: 'For You', icon: <IoHomeOutline size={32} /> },
        {
            to: `${routes.following}`,
            text: 'Following',
            icon: <AiOutlineUsergroupDelete size={32} />,
        },
        { to: `/${routes.live}`, text: 'LIVE', icon: <VscDeviceCameraVideo size={32} /> },
    ];

    return (
        <div className='h-screen w-full pr-2'>
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
            <div className='pl-2 pt-[20px] pb-[24px] border-y-[0.5px] border-y-[#1618231f]'>
                <p className='text-[16px] leading-[22px] text-[#16182380]'>
                    Log in to follow creators, like videos, and view comments.
                </p>
                <div className='mt-[20px]'>
                    <Button text='Log in' type='outlined' size='lg' />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
