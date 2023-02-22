import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import PostList from 'components/PostList/PostList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { refreshTokenService } from 'layouts/AuthLayout/services/authService';
import { FC, useState } from 'react';
import { findCurrentUserByAccessToken } from 'redux/reducers/authSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: FC = () => {
    const [page, setPage] = useState(1);
    const accessToken = localStorage.getItem('accessToken')!;

    const dispatch = useAppDispatch();

    return (
        <div className={cx('container')}>
            <Button
                size='md'
                text='Get current user by access token'
                variant='outlined'
                onClick={() => dispatch(findCurrentUserByAccessToken(accessToken))}
            />

            <PostList page={page} onChangePage={setPage} />
        </div>
    );
};

export default HomePage;
