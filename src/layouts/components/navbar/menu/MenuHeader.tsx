import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowLeft } from 'react-icons/md';

interface MenuHeaderProps {
    onCloseLanguageMenu: (value: boolean) => void;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ onCloseLanguageMenu }) => {
    const { t } = useTranslation();

    const handleCloseLanguageMenu = () => {
        onCloseLanguageMenu(false);
    };

    return (
        <div className='w-full min-h-[50px] flex items-center cursor-pointer py-[10px]'>
            <span className='ml-[28px]' onClick={handleCloseLanguageMenu}>
                <MdKeyboardArrowLeft size={30} />
            </span>
            <p className='text-[16px] leading-[22px] font-semibold flex-1 ml-[30px]'>
                {t('language')}
            </p>
        </div>
    );
};

export default MenuHeader;
