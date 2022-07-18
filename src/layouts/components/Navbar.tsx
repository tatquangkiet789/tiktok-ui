import React from 'react';
import { IoAdd, IoChatboxEllipsesOutline, IoPaperPlaneOutline } from 'react-icons/io5';
import logo from '../../assets/images/logo.svg';
import Search from '../../components/Search';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const Navbar: React.FC = () => {
    return (
        <div className='w-full h-[60px] shadow-[0px_1px_1px_rgba(0,0,0,0.12)]'>
            <div className='max-w-[1150px] h-full mx-auto flex items-center justify-between'>
                <img src={logo} alt='TikTok' />
                <Search />
                <div className='flex items-center'>
                    <div
                        className='border-[1px] border-[#f1f1f2] rounded-[2px] 
                            min-w-[110px] flex items-center justify-center h-[36px]
                            cursor-pointer hover:bg-[#16182308]'
                    >
                        <IoAdd size={20} className='mr-[8px]' />
                        <span className='leading-[24px] text-[16px] font-semibold '>
                            Upload
                        </span>
                    </div>
                    <Tippy content='Messages'>
                        <button className='ml-5 cursor-pointer'>
                            <IoPaperPlaneOutline size={26} />
                        </button>
                    </Tippy>
                    <Tippy content='Inbox'>
                        <button className='ml-5 cursor-pointer'>
                            <IoChatboxEllipsesOutline size={26} />
                        </button>
                    </Tippy>
                    <img
                        src='https://res.cloudinary.com/dnwauajh9/image/upload/v1653748550/raiden-crying_lr8dfp.jpg'
                        alt='Avatar'
                        className='ml-8 h-8 w-8 rounded-full cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
