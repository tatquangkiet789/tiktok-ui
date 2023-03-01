import classNames from 'classnames/bind';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import styles from './SearchUser.module.scss';

const cx = classNames.bind(styles);

const SearchUser: React.FC = () => {
    const [keyword, setKeyword] = useState('');
    const debouncedValue = useDebounce(keyword, 500);

    useEffect(() => {
        if (!debouncedValue) return;
    }, [debouncedValue]);

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

export default SearchUser;
