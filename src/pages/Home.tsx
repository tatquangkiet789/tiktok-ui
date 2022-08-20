import React from 'react';
import ReactPlayer from 'react-player';
import { Button } from '../components';
import { IMAGES, VIDEOS } from '../constants/constants';
import { BsHeartFill } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';

const Home: React.FC = () => {
    return (
        <div className='ml-4 py-8'>
            <div className='flex w-full border-b border-b-gray012 py-4 justify-between'>
                <div className='flex'>
                    <img
                        src={IMAGES.yae}
                        alt='User Avatar'
                        className='w-[56px] h-[56px] rounded-full object-cover mr-3'
                    />
                    <div className='flex flex-col'>
                        <a href='#' className='flex group bg-red-100 w-fit'>
                            <p
                                className='group-hover:underline font-bold text-[18px]
                                leading-[25px] mr-[6px]'
                            >
                                Name
                            </p>
                            <span className='text-[14px] font-normal leading-[28px]'>
                                Username
                            </span>
                        </a>
                        <a href='#' className='hover:underline font-semibold flex-1'>
                            Hashtag
                        </a>
                        <a
                            href='#'
                            className='hover:underline font-semibold mt-1 mb-3 text-[16px]
                                leading-[22px]'
                        >
                            Original sound
                        </a>
                        <div className='flex'>
                            <ReactPlayer
                                width='287px'
                                height='513px'
                                url={VIDEOS.test}
                                controls
                            />
                            <div className='ml-5 flex flex-col items-center justify-end'>
                                <div className='flex flex-col items-center'>
                                    <button
                                        className='rounded-full bg-gray006 h-12 w-12
                                            flex justify-center items-center 
                                            hover:bg-gray01 mt-[8px] mb-[6px]'
                                    >
                                        <BsHeartFill size={23} />
                                    </button>
                                    <strong className='text-gray075 text-[12px] leading-[17px]'>
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
                                    <strong className='text-gray075 text-[12px] leading-[17px]'>
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
                                    <strong className='text-gray075 text-[12px] leading-[17px]'>
                                        1239
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Button text='Follow' type='outlined' size='sm' />
            </div>
        </div>
    );
};

export default Home;
