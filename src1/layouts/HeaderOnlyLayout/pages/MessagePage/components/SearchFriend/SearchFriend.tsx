import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { findFriendsByKeyword, resetFriendList } from 'redux/reducers/friendSlice';
// import { findFriendsByKeyword } from 'redux/reducers/friendSlice';
import styles from './SearchFriend.module.scss';

const cx = classNames.bind(styles);

const SearchFriend: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const debouncedValue = useDebounce(keyword, 500);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!debouncedValue) {
            dispatch(resetFriendList());
            return;
        }
        dispatch(findFriendsByKeyword(debouncedValue));
    }, [debouncedValue, dispatch]);

    return (
        <div className={cx('container')}>
            <input
                className={cx('input')}
                type='text'
                placeholder='Tìm kiếm người dùng'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    );
};

export default SearchFriend;
