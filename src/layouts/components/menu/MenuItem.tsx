import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../../configs/i18n';

interface MenuItemProps {
    text: string;
    icon?: any;
    languageCode?: string;
    to?: string;
    onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, languageCode, to, onClick }) => {
    let Frag: any = 'div';
    const passProps = {
        to,
    };

    const handleChangeLanguage = () => {
        i18n.changeLanguage(languageCode);
    };

    if (to) {
        passProps.to = to;
        Frag = Link;
    }

    return (
        <Frag
            className='flex items-center justify-start py-[10px] px-[16px] w-full 
                cursor-pointer hover:bg-[#16182308]'
            onClick={onClick}
            {...passProps}
        >
            {icon ? (
                <React.Fragment>
                    <span className='mr-[8px]'>{icon}</span>
                    <p className='text-[16px] font-medium'>{text}</p>
                </React.Fragment>
            ) : (
                <p className='ml-[14px] text-[16px]' onClick={handleChangeLanguage}>
                    {text}
                </p>
            )}
        </Frag>
    );
};

export default memo(MenuItem);
