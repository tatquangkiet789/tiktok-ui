import React, { useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import { ReactComponent as CloseIcon } from '../../../../assets/icons/close.svg';

const cx = classNames.bind(styles);

const Search: React.FC = () => {
    const [search, setSearch] = useState('');

    return (
        <div className={cx('container')}>
            <input
                className={cx('input')}
                type='text'
                placeholder='Tìm kiếm tài khoản và video'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
                <span className={cx('close')} onClick={() => setSearch('')}>
                    <CloseIcon />
                </span>
            ) : null}
            <span className={cx('divide')}></span>
            <span
                className={cx('icon', {
                    active: search,
                })}
            >
                <SearchIcon className='seach' />
            </span>
        </div>
    );
};

export default Search;
