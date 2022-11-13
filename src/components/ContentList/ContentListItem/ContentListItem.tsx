import React, { memo } from 'react';
import ReactPlayer from 'react-player';
import Button from '../../Button/Button';
import { URLS } from '../../../constants/constants';
import { BsHeartFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { Content } from '../../../models/content';

interface ContentListItemProps {
    content: Content;
}

const ContentListItem: React.FC<ContentListItemProps> = ({ content }) => {
    const { avatar, name, username, hashtag, originalSound, video } = content;

    return (
        <div className='flex w-full border-b border-b-gray012 py-4 justify-between'>
            <div className='flex'>
                <img
                    src={avatar}
                    alt='User Avatar'
                    className='w-[56px] h-[56px] rounded-full object-cover mr-3'
                />
                <div className='flex flex-col'>
                    <a
                        href={URLS.placeholder}
                        target='_blank'
                        rel='noreferrer'
                        className='flex group w-fit'
                    >
                        <p
                            className='group-hover:underline font-bold text-[18px]
                                leading-[25px] mr-[6px]'
                        >
                            {username}
                        </p>
                        <span className='text-[14px] font-normal leading-[28px]'>
                            {name}
                        </span>
                    </a>
                    <a
                        href={URLS.placeholder}
                        target='_blank'
                        rel='noreferrer'
                        className='hover:underline font-semibold flex-1'
                    >
                        {hashtag}
                    </a>
                    <a
                        href={URLS.placeholder}
                        target='_blank'
                        className='hover:underline font-semibold mt-1 mb-3 text-[16px]
                            leading-[22px]'
                        rel='noreferrer'
                    >
                        {originalSound}
                    </a>
                    <div className='flex'>
                        <ReactPlayer width='287px' height='513px' url={video} controls />
                        <div className='ml-5 flex flex-col items-center justify-end'>
                            <div className='flex flex-col items-center'>
                                <button
                                    className='rounded-full bg-gray006 h-12 w-12
                                        flex justify-center items-center 
                                        hover:bg-gray01 mt-[8px] mb-[6px]'
                                >
                                    <BsHeartFill size={23} />
                                </button>
                                <strong
                                    className='text-gray075 text-[12px] 
                                        leading-[17px]'
                                >
                                    2.2M
                                </strong>
                            </div>
                            <div className='flex flex-col items-center'>
                                <button
                                    className='rounded-full bg-gray006 h-12 w-12
                                        flex justify-center items-center 
                                        hover:bg-gray01 mt-[8px] mb-[6px]'
                                >
                                    <AiFillMessage size={23} />
                                </button>
                                <strong
                                    className='text-gray075 text-[12px] 
                                        leading-[17px]'
                                >
                                    5000
                                </strong>
                            </div>
                            <div className='flex flex-col items-center'>
                                <button
                                    className='rounded-full bg-gray006 h-12 w-12
                                        flex justify-center items-center 
                                        hover:bg-gray01 mt-[8px] mb-[6px]'
                                >
                                    <RiShareForwardFill size={23} />
                                </button>
                                <strong
                                    className='text-gray075 text-[12px] 
                                        leading-[17px]'
                                >
                                    1239
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button text='Follow' type='outlined' size='sm' />
        </div>
    );
};

export default memo(ContentListItem);
