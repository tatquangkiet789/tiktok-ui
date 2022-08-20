import React, { memo } from 'react';

interface FooterItemProps {
    content: string;
    to?: string;
    href?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ content, to, href }) => {
    return (
        <a href={href}>
            <p
                className='text-gray05 mr-[6px] p-[2px] text-[12px] font-semibold
                hover:cursor-pointer hover:underline'
            >
                {content}
            </p>
        </a>
    );
};

export default memo(FooterItem);
