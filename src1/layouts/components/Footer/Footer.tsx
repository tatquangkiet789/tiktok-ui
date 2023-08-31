import React from 'react';
import { BiCopyright } from 'react-icons/bi';
import FooterItem from './FooterItem';

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
        { content: 'Help', href: 'https://www.google.com.vn/' },
        { content: 'Safety', href: 'https://www.google.com.vn/' },
        { content: 'Terms', href: 'https://www.google.com.vn/' },
        { content: 'Privacy', href: 'https://www.google.com.vn/' },
        { content: 'Creator Portal', href: 'https://www.google.com.vn/' },
        { content: 'Community', href: 'https://www.google.com.vn/' },
        { content: 'Guidelines', href: 'https://www.google.com.vn/' },
    ];

    return (
        <React.Fragment>
            <div className='flex flex-wrap'>
                {item1.map(({ content, href }, index) => (
                    <FooterItem key={index} content={content} href={href} />
                ))}
            </div>
            <div className='flex flex-wrap mt-[10px]'>
                {item2.map(({ content, href }, index) => (
                    <FooterItem key={index} content={content} href={href} />
                ))}
            </div>
            <div className='flex flex-wrap mt-[10px]'>
                {item3.map(({ content, href }, index) => (
                    <FooterItem key={index} content={content} href={href} />
                ))}
            </div>
            <div className='flex items-center mt-[10px]'>
                <span>
                    <BiCopyright size={10} className='text-gray05' />
                </span>
                <p className='text-gray05 text-[12px] font-semibold'>
                    Tất Quảng Kiệt - 2022
                </p>
            </div>
        </React.Fragment>
    );
};

export default Footer;
