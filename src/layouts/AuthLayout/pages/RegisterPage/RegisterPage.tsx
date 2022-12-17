import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import React from 'react';
import styles from './RegisterPage.module.scss';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';

const cx = classNames.bind(styles);

interface IRegisterFormValue {
    lastName: string;
    firstName: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

const RegisterPage: React.FC = () => {
    const initialValues: IRegisterFormValue = {
        lastName: '',
        firstName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    };

    const validationSchema = Yup.object({
        lastName: Yup.string()
            .max(60, 'Họ không được quá 60 ký tự')
            .min(2, 'Họ phải nhiều hơn 2 ký tự')
            .required('Họ không được để trống'),
        firstName: Yup.string()
            .max(30, 'Tên không được quá 30 ký tự')
            .min(1, 'Tên phải nhiều hơn 2 ký tự')
            .required('Tên không được để trống'),
        username: Yup.string()
            .max(60, 'Tên tài khoản không được quá 60 ký tự')
            .min(4, 'Tên tài khoản phải nhiều hơn 4 ký tự')
            .required('Tên tài khoản không được để trống'),
        password: Yup.string()
            .max(100, 'Mật khẩu không được quá 100 ký tự')
            .min(3, 'Mật khẩu phải dài hơn 3 ký tự')
            .required('Mật khẩu không được để trống'),
        confirmPassword: Yup.string()
            .required('Vui lòng nhập lại mật khẩu')
            .oneOf([Yup.ref('password')], 'Mật khẩu không trùng'),
        email: Yup.string()
            .required('Email không được để trống')
            .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không hợp lệ'),
    });

    return (
        <React.Fragment>
            <h1 className={cx('register-text')}>Đăng ký</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { errors, values, handleChange, handleSubmit } = formikProps;
                    return (
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <Field
                                as={InputField}
                                name='lastName'
                                label='Họ của bạn'
                                inputType='text'
                                value={values.lastName}
                                onChangeValue={handleChange}
                                placeholder='Nhập họ của bạn'
                                error={errors.lastName}
                            />
                            <Field
                                as={InputField}
                                name='firstName'
                                label='Tên của bạn'
                                inputType='text'
                                value={values.firstName}
                                onChangeValue={handleChange}
                                placeholder='Nhập tên của bạn'
                                error={errors.firstName}
                            />
                            <Field
                                as={InputField}
                                name='username'
                                label='Tên tài khoản'
                                inputType='text'
                                value={values.username}
                                onChangeValue={handleChange}
                                placeholder='Nhập tên tài khoản của bạn'
                                error={errors.username}
                            />
                            <Field
                                as={InputField}
                                name='password'
                                label='Mật khẩu'
                                inputType='password'
                                value={values.password}
                                onChangeValue={handleChange}
                                placeholder='Nhập mật khẩu của bạn'
                                error={errors.password}
                            />
                            <Field
                                as={InputField}
                                name='confirmPassword'
                                label='Tài khoản'
                                inputType='password'
                                value={values.confirmPassword}
                                onChangeValue={handleChange}
                                placeholder='Nhập lại mật khẩu'
                                error={errors.confirmPassword}
                            />
                            <Field
                                as={InputField}
                                name='email'
                                label='Email của bạn'
                                inputType='text'
                                value={values.email}
                                onChangeValue={handleChange}
                                placeholder='Nhập email của bạn'
                                error={errors.email}
                            />
                            <div className={cx('register-button')}>
                                <Button
                                    text='Đăng ký'
                                    variant='primary'
                                    size='lg'
                                    type='submit'
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </React.Fragment>
    );
};

export default RegisterPage;
