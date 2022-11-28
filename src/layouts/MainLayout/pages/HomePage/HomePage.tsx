import classNames from 'classnames/bind';
import React, { FormEvent, useState } from 'react';
import PostList from '../../../../components/PostList/PostList';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { loginUser } from '../../../../reducers/authSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    return (
        <div className={cx('container')}>
            <PostList />
        </div>
    );
};

export default HomePage;
