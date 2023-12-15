import { HomeIcon, FriendsIcon, WatchIcon } from 'assets/icons';
import cn from 'lib/clsx';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from 'routes/routes';

const NavLinks = () => {
    const navLinkItems = [
        { to: `${APP_ROUTES.HOME}`, text: 'Dành cho bạn', icon: <HomeIcon /> },
        {
            to: `${APP_ROUTES.FRIENDS}`,
            text: 'Bạn bè',
            icon: <FriendsIcon />,
        },
        {
            to: `${APP_ROUTES.WATCH}`,
            text: 'Watch',
            icon: <WatchIcon />,
        },
    ];

    return (
        <>
            {navLinkItems.map(({ to, text, icon }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={(nav) =>
                        cn(
                            'flex items-center p-2 w-full ease-in-out duration-200 hover:bg-gray003 hover:rounded-[5px]',
                            {
                                'text-primary [&_svg]:fill-primary': nav.isActive,
                            },
                        )
                    }
                >
                    {icon}
                    <p className='ml-2 text-lg font-bold'>{text}</p>
                </NavLink>
            ))}
        </>
    );
};

export default NavLinks;
