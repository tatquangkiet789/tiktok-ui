import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage: React.FC = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <React.Fragment>
            <h1 className={cx('login-text')}>Đăng nhập</h1>
            <div className={cx('form')}>
                <label className={cx('label')}>Tên tài khoản</label>
                <input type='text' className={cx('input')} placeholder='Tên tài khoản' />
                <label className={cx('label')}>Mật khẩu</label>
                <input type='text' className={cx('input')} placeholder='Mật khẩu' />
                <p className={cx('forgot-password')}>Quên mật khẩu?</p>
                <Button text='Đăng nhập' type='primary' size='lg' />
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
