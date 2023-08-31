import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useDebounce from 'hooks/useDebounce';
import { CloseIcon, SearchIcon } from 'assets/icons';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Wrapper from 'components/ui/Wrapper/Wrapper';
import AccountItem from 'components/ui/AccoutItem/AccountItem';
import { IUser } from 'modules/users/models/userModel';
import { findAllUsersByKeywordService } from 'modules/users/services/userService';

const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (debouncedValue.trim() === '') {
            setSearchResult([]);
            return;
        }

        const findAllUsersByKeyword = async () => {
            try {
                setIsLoading(true);
                const data = await findAllUsersByKeywordService(debouncedValue);

                setSearchResult(data.content);
                setIsLoading(false);
                setIsShow(true);
            } catch (error) {
                const err = error as AxiosError;
                if (err.response) toast.error((err.response.data as any).message);
                else toast.error(err.message);
                return Promise.reject();
            }
        };

        findAllUsersByKeyword();
    }, [debouncedValue]);

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
                >
                    <SearchIcon />
                </span>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
