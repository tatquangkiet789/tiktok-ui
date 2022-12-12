import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useDebounce from 'hooks/useDebounce';
import { searchUsersByKeyword } from 'redux/reducers/searchSlice';
import Wrapper from 'components/Wrapper/Wrapper';
import AccountItem from 'components/AccoutItem/AccountItem';
import { CloseIcon, SearchIcon } from 'assets/icons';

const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const { result, loading } = useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [isShow, setIsShow] = useState(false);

    const debouncedValue = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedValue.trim() === '') return;

        dispatch(searchUsersByKeyword(debouncedValue.trim()));
        setIsShow(true);
    }, [debouncedValue, dispatch]);

    const handleCloseSearchWrapper = () => {
        setIsShow(false);
    };

    const handleClearSearchValue = () => {
        setIsShow(false);
        setSearch('');
    };

    return (
        <HeadlessTippy
            interactive
            visible={result.length !== 0 && isShow ? true : false}
            onClickOutside={handleCloseSearchWrapper}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs} className={cx('search-result')}>
                    <Wrapper>
                        <h4 className={cx('search-title')}>Tài khoản</h4>
                        {result.map(
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && loading !== true ? (
                    <span onClick={handleClearSearchValue}>
                        <CloseIcon />
                    </span>
                ) : null}
                {loading ? (
                    <span className={cx('loading')}>
                        <AiOutlineLoading3Quarters size={16} />
                    </span>
                ) : null}
                <span className={cx('divide')}></span>
                <span
                    className={cx('icon', {
                        active: search,
                    })}
                >
                    <SearchIcon />
                </span>
            </div>
        </HeadlessTippy>
    );
};

export default Search;
