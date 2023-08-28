import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { loginUser } from 'redux/reducers/authSlice';
import { toast } from 'react-toastify';
import { ROUTES } from 'constants/api';
import { ROLES, STORAGE_KEY } from 'constants/constants';
import { ILogin } from 'modules/auth/models/authModel';
import InputField from 'components/form/InputField/InputField';
import Button from 'components/ui/Button/Button';

const cx = classNames.bind(styles);

const Login: FC = () => {
    const { loading: authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from.pathname || ROUTES.home;

    const initialValues: ILogin = {
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

    return (
        <Fragment>
            <h1 className={cx('login-text')}>Đăng nhập</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    dispatch(loginUser(values))
                        .unwrap()
                        .then((data) => {
                            const currentUser = data.content;
                            sessionStorage.setItem(
                                STORAGE_KEY.ACCESS_TOKEN,
                                currentUser.accessToken,
                            );
                            resetForm();
                            if (currentUser.userRoleId === ROLES.USER)
                                return navigate(from);
                            toast.info('Đang chuyển về trang admin');
                        });
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
                                disabled={authLoading}
                                loading={authLoading}
                            />
                        </form>
                    );
                }}
            </Formik>
        </Fragment>
    );
};

export default Login;
