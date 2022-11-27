import classNames from 'classnames/bind';
import React, { FormEvent, useState } from 'react';
import PostList from '../../../../components/PostList/PostList';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { loginUser } from '../../../../slices/authSlice';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
    const [username, setUsername] = useState('user1');
    const [password, setPassword] = useState('123');

    const dispatch = useAppDispatch();

    const handleSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    return (
        <div className={cx('container')}>
            {/* <PostList /> */}
            <form onSubmit={handleSubmitLogin}>
                <label>Tài khoản</label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Mật khẩu</label>
                <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Đăng nhập</button>
            </form>
        </div>
    );
};

export default HomePage;
