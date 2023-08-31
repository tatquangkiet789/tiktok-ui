import React from 'react';

interface SidebarDiscoverCardProps {
    icon: any;
    name: string;
}

const SidebarDiscoverCard: React.FC<SidebarDiscoverCardProps> = ({ icon, name }) => {
    return (
        <div
            className='flex border-[1px] border-gray012 rounded-[12px] px-[10px] 
                py-[3px] max-w-full w-fit mr-2 mb-3 items-center cursor-pointer
                hover:bg-gray003'
        >
            <span>{icon}</span>
            <p className='text-[14px] text-gray05 font-normal pl-[6px]'>{name}</p>
        </div>
    );
};

export default SidebarDiscoverCard;
