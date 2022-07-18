import React, { useState } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from './Wrapper';
import AccountItem from './AccountItem';

const Search: React.FC = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    return (
        <React.Fragment>
            <HeadlessTippy
                interactive
                visible={true}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs} className='w-[361px]'>
                        <Wrapper>
                            <p
                                className='text-[#16182380] py-[5px] px-[12px] 
                                    font-semibold text-[16px]'
                            >
                                Accounts
                            </p>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </Wrapper>
                    </div>
                )}
            >
                <div
                    className='bg-[#f1f1f2] w-[361px] h-[46px] rounded-full flex 
                        items-center justify-between border-[1px] border-transparent
                        focus-within:border-[#1618234d]'
                >
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search for account and videos'
                        className='bg-transparent rounded-l-full focus:outline-none
                            text-[16px] pl-[20px] pr-[12px] caret-primary flex-1
                            leading-[22px] placeholder:text-[#16182399]'
                    />
                    {search && loading !== false ? (
                        <IoCloseCircle
                            size={16}
                            color='#16182357'
                            className='mr-[12px]'
                        />
                    ) : (
                        <></>
                    )}

                    {/* {loading ? (
                        <AiOutlineLoading3Quarters
                            size={16}
                            color='#16182357'
                            className='mr-[12px] animate-spin'
                        />
                    ) : (
                        <></>
                    )} */}

                    <span className='h-[28px] w-[1px] bg-[#1618231f]'></span>
                    <button
                        className='py-[12px] pl-[12px] pr-[16px] hover:bg-[#16182308] 
                            hover:cursor-pointer rounded-r-full active:bg-[#1618230f]'
                    >
                        <IoSearch
                            size={20}
                            color={search ? '#161823bf' : 'rgba(22, 24, 35, 0.34)'}
                        />
                    </button>
                </div>
            </HeadlessTippy>
        </React.Fragment>
    );
};

export default Search;
