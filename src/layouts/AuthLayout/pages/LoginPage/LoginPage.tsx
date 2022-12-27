import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from 'routes/routes';
import styles from './LoginPage.module.scss';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { loginUser } from 'redux/reducers/authSlice';
import { ILoginFormValue } from 'models/login';

const cx = classNames.bind(styles);

const LoginPage: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const initialValues: ILoginFormValue = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .max(60, 'Tên tài khoản không được quá 60 ký tự')
            .min(3, 'Tên tài khoản phải nhiều hơn 3 kí tự')
            .required('Tên tài khoản không được để trống'),
        password: Yup.string()
            .max(100, 'Mật khẩu không được quá 100 ký tự')
            .min(3, 'Mật khẩu phải dài hơn 3 kí tự')
            .required('Mật khẩu không được để trống'),
    });

    if (currentUser) return <Navigate to={routes.home} replace />;

    return (
        <React.Fragment>
            <h1 className={cx('login-text')}>Đăng nhập</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    dispatch(loginUser(values));
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { errors, values, handleChange, handleSubmit } = formikProps;
                    return (
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <Field
                                as={InputField}
                                name='username'
                                label='Tài khoản'
                                inputType='text'
                                value={values.username}
                                onChangeValue={handleChange}
                                placeholder='Tên tài khoản'
                                error={errors.username}
                            />
                            <Field
                                as={InputField}
                                name='password'
                                label='Mật khẩu'
                                inputType='password'
                                value={values.password}
                                onChangeValue={handleChange}
                                placeholder='Mật khẩu'
                                error={errors.password}
                            />
                            <p className={cx('forgot-password')}>Quên mật khẩu?</p>
                            <Button
                                text='Đăng nhập'
                                variant='primary'
                                type='submit'
                                size='lg'
                            />
                        </form>
                    );
                }}
            </Formik>
        </React.Fragment>
    );
};

export default LoginPage;
