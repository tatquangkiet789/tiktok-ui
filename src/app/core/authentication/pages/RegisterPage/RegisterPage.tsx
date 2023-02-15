import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import React, { ChangeEvent, useEffect } from 'react';
import styles from './RegisterPage.module.scss';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Navigate, useNavigate } from 'react-router-dom';
import { registerUser, resetRegisterMessage } from 'redux/reducers/authSlice';
import { toast } from 'react-toastify';
import { IRegisterFormValue } from 'layouts/AuthLayout/models/register';

const cx = classNames.bind(styles);

const RegisterPage: React.FC = () => {
    const { registerMessage, authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const initialValues: IRegisterFormValue = {
        lastName: '',
        firstName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: null as any,
    };

    useEffect(() => {
        if (registerMessage) dispatch(resetRegisterMessage());
    }, [dispatch, registerMessage]);

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

    if (registerMessage) return <Navigate to='/auth/login' replace />;

    return (
        <React.Fragment>
            <h1 className={cx('register-text')}>Đăng ký</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    const { firstName, lastName, username, password, email, avatar } =
                        values;
                    const formData = new FormData();

                    formData.append('avatar', avatar);
                    formData.append('firstName', firstName);
                    formData.append('lastName', lastName);
                    formData.append('username', username);
                    formData.append('password', password);
                    formData.append('email', email);

                    dispatch(registerUser(formData))
                        .unwrap()
                        .then((message: string) => {
                            toast.success(message);
                            return navigate('/auth/login', {
                                replace: true,
                            });
                        });
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const {
                        errors,
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    } = formikProps;
                    return (
                        <form
                            className={cx('form')}
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >
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
                            <Field
                                as={InputField}
                                name='avatar'
                                label='Ảnh đại diện'
                                value={undefined}
                                inputType='file'
                                onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (!e.currentTarget.files) return;
                                    setFieldValue('avatar', e.currentTarget.files[0]);
                                }}
                                error={errors.avatar}
                            />
                            <div className={cx('register-button')}>
                                <Button
                                    text='Đăng ký'
                                    loading={authLoading}
                                    variant='primary'
                                    size='lg'
                                    type='submit'
                                    disabled={isSubmitting}
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
