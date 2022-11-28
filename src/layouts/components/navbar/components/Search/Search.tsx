import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as SearchIcon } from '../../../../../assets/icons/search.svg';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/close.svg';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from '../../../../../components/Wrapper/Wrapper';
import AccountItem from '../../../../../components/AccoutItem/AccountItem';
import { useAppSelector } from '../../../../../hooks/useAppSelector';
import useDebounce from '../../../../../hooks/useDebounce';
import { useAppDispatch } from '../../../../../hooks/useAppDispatch';
import { searchUsersByKeyword } from '../../../../../reducers/searchSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

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

    const handleCleanSearchValue = () => {
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
                    <span onClick={handleCleanSearchValue}>
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
