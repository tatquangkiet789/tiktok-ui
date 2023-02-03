import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useDebounce from 'hooks/useDebounce';
import Wrapper from 'components/Wrapper/Wrapper';
import { CloseIcon, SearchIcon } from 'assets/icons';
import AccountItem from 'layouts/components/components/AccoutItem/AccountItem';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { findAllUsersByKeyword } from 'redux/reducers/userSlice';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [isShow, setIsShow] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);

    const {
        searchResult,
        loading: isLoading,
        error,
    } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debouncedValue.trim() === '') return;

        dispatch(findAllUsersByKeyword(debouncedValue))
            .unwrap()
            .then(() => {
                setIsShow(true);
            });
    }, [debouncedValue, dispatch]);

    const handleCloseSearchWrapper = () => {
        setIsShow(false);
    };

    const handleClearSearchValue = () => {
        setIsShow(false);
        setSearchValue('');
    };

    if (error) toast.error(error);

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
                    onClick={() =>
                        dispatch(findAllUsersByKeyword(debouncedValue))
                            .unwrap()
                            .then(() => {
                                setIsShow(true);
                            })
                    }
                >
                    <SearchIcon />
                </span>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
