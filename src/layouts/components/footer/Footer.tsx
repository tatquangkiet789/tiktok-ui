import React from 'react';
import { BiCopyright } from 'react-icons/bi';

const Footer: React.FC = () => {
    const item1 = [
        { content: 'About', href: 'https://www.google.com.vn/' },
        { content: 'TikTok Browse', href: 'https://www.google.com.vn/' },
        { content: 'Newsroom', href: 'https://www.google.com.vn/' },
        { content: 'Contact', href: 'https://www.google.com.vn/' },
        { content: 'Careers', href: 'https://www.google.com.vn/' },
        { content: 'ByteDance', href: 'https://www.google.com.vn/' },
    ];
    const item2 = [
        { content: 'TikTok For Good', href: 'https://www.google.com.vn/' },
        { content: 'Advertise', href: 'https://www.google.com.vn/' },
        { content: 'Developers', href: 'https://www.google.com.vn/' },
        { content: 'Transparency', href: 'https://www.google.com.vn/' },
        { content: 'TikTok Rewards', href: 'https://www.google.com.vn/' },
    ];
    const item3 = [
        { content: 'About', href: 'https://www.google.com.vn/' },
        { content: 'TikTok Browse', href: 'https://www.google.com.vn/' },
        { content: 'Newsroom', href: 'https://www.google.com.vn/' },
        { content: 'Contact', href: 'https://www.google.com.vn/' },
        { content: 'Careers', href: 'https://www.google.com.vn/' },
        { content: 'ByteDance', href: 'https://www.google.com.vn/' },
    ];

    return (
        <div className='mb-[75px]'>
            <div className='flex items-center mt-[5px] mr-[6px]'>
                <span>
                    <BiCopyright size={10} className='text-gray05' />
                </span>
                <p className='font-[5px] text-gray05 leading-[5px] font-semibold'>
                    Tất Quảng Kiệt - 2022
                </p>
            </div>
        </div>
    );
};

export default Footer;
