import React, { useCallback, useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi';
import { RiKeyboardBoxLine } from 'react-icons/ri';
import { HiDotsVertical } from 'react-icons/hi';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from '../../Wrapper';
import MenuItem from './MenuItem';
import { IoLanguage } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import MenuHeader from './MenuHeader';

const Menu: React.FC = () => {
    const { t } = useTranslation();
    const [openLanguageMenu, setOpenLanguageMenu] = useState(false);
    const [openKeyboardShortcutModal, setOpenKeyboardShortcutModal] = useState(false);

    const handleOpenLanguageMenu = useCallback(() => {
        setOpenLanguageMenu(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenKeyboardShortcutModal = () => {
        setOpenKeyboardShortcutModal(true);
    };

    const menuItems = [
        {
            text: t('english'),
            icon: <IoLanguage size={20} />,
            click: handleOpenLanguageMenu,
        },
        {
            text: t('feedbacksAndHelp'),
            icon: <BiHelpCircle size={20} />,
            to: '/feeback',
        },
        {
            text: t('keyboardShortcuts'),
            icon: <RiKeyboardBoxLine size={20} />,
            click: handleOpenKeyboardShortcutModal,
        },
    ];

    const languageMenu = [
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
        { code: 'vi', text: 'Tiếng Việt' },
        { code: 'en', text: 'English' },
    ];

    return (
        <HeadlessTippy
            zIndex={1}
            interactive
            placement='bottom-end'
            render={(attrs) => (
                <div tabIndex={-1} {...attrs} className='min-w-[223px] z-10'>
                    <Wrapper>
                        {openLanguageMenu ? (
                            <React.Fragment>
                                <MenuHeader onCloseLanguageMenu={setOpenLanguageMenu} />
                                <div className='overflow-y-scroll'>
                                    {languageMenu.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            text={item.text}
                                            languageCode={item.code}
                                        />
                                    ))}
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {menuItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        text={item.text}
                                        icon={item.icon}
                                        to={item.to}
                                        onClick={item.click}
                                    />
                                ))}
                            </React.Fragment>
                        )}
                    </Wrapper>
                </div>
            )}
        >
            <div className='ml-4 cursor-pointer'>
                <HiDotsVertical size={20} />
            </div>
        </HeadlessTippy>
    );
};

export default Menu;
