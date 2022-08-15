import React, { memo } from 'react';

interface FooterItemProps {
    content: string;
    to?: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ content, to }) => {
    return (
        <a href={to}>
            <p className='text-gray05 mr-[6px]'>{content}</p>
        </a>
    );
};

export default memo(FooterItem);
