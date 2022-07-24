import React, { useState } from 'react';
import { IoCloseCircle, IoSearch } from 'react-icons/io5';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from '../Wrapper';
import AccountItem from '../../../components/AccountItem';
import { useTranslation } from 'react-i18next';
import { IMAGES } from '../../../constants/constants';

const Search: React.FC = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const [loading] = useState(true);
    const accounts = [
        { name: 'Raiden Shogun', usename: 'raiden.shogun', image: IMAGES.raiden },
        { name: 'Yae Miko', usename: 'yae.miko', image: IMAGES.yae },
        { name: 'Angry Yae', usename: 'angry.yae', image: IMAGES.angryYae },
        { name: 'Paimon', usename: 'paimon', image: IMAGES.paimon },
        { name: 'Raiden Yae', usename: 'raiden.yae', image: IMAGES.raidenYae },
        { name: 'Shiba Inu', usename: 'shiba.inu', image: IMAGES.shiba },
    ];

    return (
        <React.Fragment>
            <HeadlessTippy
                interactive
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs} className='w-[361px] z-10'>
                        <Wrapper>
                            <p
                                className='text-gray05 py-[5px] px-[12px] 
                                    font-semibold text-[16px]'
                            >
                                {t('accounts')}
                            </p>
                            {accounts.map((account, index) => (
                                <AccountItem
                                    key={index}
                                    name={account.name}
                                    username={account.usename}
                                    image={account.image}
                                />
                            ))}
                        </Wrapper>
                    </div>
                )}
            >
                <div
                    className='bg-gray241_241_242_1 w-[361px] h-[46px] rounded-full flex 
                        items-center justify-between border-[1px] border-transparent
                        focus-within:border-gray03'
                >
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t('searchForAccountsAndVideos')}
                        className='bg-transparent rounded-l-full focus:outline-none
                            text-[16px] pl-[20px] pr-[12px] caret-primary flex-1
                            leading-[22px] placeholder:text-gray06'
                    />
                    {search && loading !== false ? (
                        <IoCloseCircle
                            size={16}
                            color='rgba(22, 24, 35, 0.34)'
                            className='mr-[12px]'
                        />
                    ) : (
                        <></>
                    )}

                    {/* {loading ? (
                        <AiOutlineLoading3Quarters
                            size={16}
                            color='rgba(22, 24, 35, 0.34)'
                            className='mr-[12px] animate-spin'
                        />
                    ) : (
                        <></>
                    )} */}

                    <span className='h-[28px] w-[1px] bg-gray012'></span>
                    <button
                        className='py-[12px] pl-[12px] pr-[16px] hover:bg-gray003 
                            hover:cursor-pointer rounded-r-full active:bg-gray006'
                    >
                        <IoSearch
                            size={20}
                            color={
                                search
                                    ? 'rgba(22, 24, 35, 0.75)'
                                    : 'rgba(22, 24, 35, 0.34)'
                            }
                        />
                    </button>
                </div>
            </HeadlessTippy>
        </React.Fragment>
    );
};

export default Search;
