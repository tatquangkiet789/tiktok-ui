import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarMenuProps {
    to: string;
    text: string;
    icon: any;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ to, text, icon }) => {
    return (
        <NavLink
            to={to}
            className={(nav) => (nav.isActive ? 'navlink-active' : 'navlink')}
        >
            <span>{icon}</span>
            <p className='ml-2 text-[18px] leading-[25px] font-bold'>{text}</p>
        </NavLink>
    );
};

export default SidebarMenu;
