import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import React, { useState } from 'react';
import styles from './RegisterPage.module.scss';

const cx = classNames.bind(styles);

const RegisterPage: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <React.Fragment>
            <h1 className={cx('register-text')}>Đăng ký</h1>
            <div className={cx('form')}>
                <InputField
                    label='Họ'
                    inputType='text'
                    value={lastName}
                    onChangeValue={setLastName}
                    placeholder='Họ của bạn'
                />
                <InputField
                    label='Tên'
                    inputType='text'
                    value={firstName}
                    onChangeValue={setFirstName}
                    placeholder='Tên của bạn'
                />
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
                <InputField
                    label='Nhập lại mật khẩu'
                    inputType='password'
                    value={reEnterPassword}
                    onChangeValue={setReEnterPassword}
                    placeholder='Nhập lại mật khẩu'
                />
                <InputField
                    label='Email'
                    inputType='text'
                    value={email}
                    onChangeValue={setEmail}
                    placeholder='Email của bạn'
                />
                <div className={cx('register-button')}>
                    <Button text='Đăng ký' variant='primary' size='lg' />
                </div>
            </div>
        </React.Fragment>
    );
};

export default RegisterPage;
