import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useDebounce from 'hooks/useDebounce';
import Wrapper from 'components/Wrapper/Wrapper';
import { CloseIcon, SearchIcon } from 'assets/icons';
import AccountItem from 'layouts/components/components/AccoutItem/AccountItem';
import { useQuery } from '@tanstack/react-query';
import { findAllUsersByKeyword } from '../../services/seachServer';
import { IUser } from 'models/user';

const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResult, setSearchResult] = useState<IUser[]>([]);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedValue.trim() === '') {
            setSearchResult([]);
            return;
        }

        searchUsersByKeyword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const searchUsersByKeyword = async () => {
        setIsLoading(true);
        const data = await findAllUsersByKeyword(debouncedValue);
        setSearchResult(data);
        setIsLoading(false);
        setIsShow(true);
    };

    const handleCloseSearchWrapper = () => {
        setIsShow(false);
    };

    const handleClearSearchValue = () => {
        setIsShow(false);
        setSearchValue('');
    };

    return (
        <HeadlessTippy
            interactive
            visible={searchResult && isShow ? true : false}
            onClickOutside={handleCloseSearchWrapper}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs} className={cx('search-result')}>
                    <Wrapper>
                        <h4 className={cx('search-title')}>Tài khoản</h4>
                        {searchResult.map(
                            ({ id, firstName, lastName, avatar, username, tick }) => (
                                <AccountItem
                                    key={id}
                                    firstName={firstName}
                                    lastName={lastName}
                                    avatar={avatar}
                                    username={username}
                                    tick={tick}
                                    size='md'
                                />
                            ),
                        )}
                    </Wrapper>
                </div>
            )}
        >
            <div className={cx('container')}>
                <input
                    className={cx('input')}
                    type='text'
                    placeholder='Tìm kiếm tài khoản và video'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    // onFocus={() => setIsShow(true)}
                />
                {searchValue && isLoading !== true ? (
                    <span onClick={handleClearSearchValue}>
                        <CloseIcon />
                    </span>
                ) : null}
                {isLoading ? (
                    <span className={cx('loading')}>
                        <AiOutlineLoading3Quarters size={16} />
                    </span>
                ) : null}
                <span className={cx('divide')}></span>
                <span
                    className={cx('icon', {
                        active: searchValue,
                    })}
                    onClick={searchUsersByKeyword}
                >
                    <SearchIcon />
                </span>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
