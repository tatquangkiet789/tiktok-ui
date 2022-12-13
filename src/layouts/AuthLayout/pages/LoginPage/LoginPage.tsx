import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from 'redux/reducers/authSlice';
import routes from 'routes/routes';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('user3');
    const [password, setPassword] = useState('123');
    const navigate = useNavigate();

    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === '') {
            toast.error('Vui lòng điền tên tài khoản');
            return;
        }
        if (password === '') {
            toast.error('Vui lòng điền mật khẩu');
            return;
        }
        dispatch(loginUser({ username: username, password: password }));
    };

    if (currentUser) return <Navigate to={routes.home} replace />;

    return (
        <React.Fragment>
            <h1 className={cx('login-text')}>Đăng nhập</h1>
            <form className={cx('form')} onSubmit={handleLoginUser}>
                <InputField
                    label='Tài khoản'
                    inputType='text'
                    value={username}
                    onChangeValue={setUsername}
                    placeholder='Tên tài khoản'
                />
                <InputField
                    label='Mật khẩu'
                    inputType='password'
                    value={password}
                    onChangeValue={setPassword}
                    placeholder='Mật khẩu'
                />
                <p className={cx('forgot-password')}>Quên mật khẩu?</p>
                <Button text='Đăng nhập' variant='primary' size='lg' />
            </form>
        </React.Fragment>
    );
};

export default LoginPage;
