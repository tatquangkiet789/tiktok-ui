import classNames from 'classnames/bind';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SidebarMenu.module.scss';

const cx = classNames.bind(styles);

interface SidebarMenuProps {
    to: string;
    text: string;
    icon: any;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ to, text, icon }) => {
    return (
        <NavLink to={to} className={(nav) => cx('container', { active: nav.isActive })}>
            {icon}
            <p>{text}</p>
        </NavLink>
    );
};

export default SidebarMenu;
