import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useLocalStorage from 'hooks/useLocalStorage';
import { refreshTokenService } from 'layouts/AuthLayout/services/authService';
import { FC, useState } from 'react';
import { findCurrentUserByAccessToken } from 'redux/reducers/authSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const accessToken = localStorage.getItem('accessToken')!;

    console.log(`Storage value: ${accessToken}`);

    return (
        <div className={cx('container')}>
            <Button
                size='md'
                text='Refresh Token'
                variant='primary'
                onClick={() => refreshTokenService()}
            />
            <Button
                size='md'
                text='Find Current user'
                variant='outlined'
                onClick={() => dispatch(findCurrentUserByAccessToken(accessToken))}
            />
            <PostList page={page} onChangePage={setPage} />
        </div>
    );
};

export default HomePage;
