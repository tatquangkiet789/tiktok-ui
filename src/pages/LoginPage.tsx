import Input from 'components/form/Input';
import Button from 'components/ui/Button';
import { Login } from 'features/auth/models/authModel';
import { loginUser } from 'features/auth/services/authThunk';
import { Field, Formik } from 'formik';
import useAccessToken from 'hooks/useAccessToken';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'routes/routes';
import * as Yup from 'yup';

const LoginPage = () => {
    const { isLoading: authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { handleSetAccessToken } = useAccessToken();
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from.pathname || APP_ROUTES.HOME;

    const initialValues: Login = {
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
        <>
            <h1 className='text-[32px] text-center flex-1 py-4'>Đăng nhập</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                    dispatch(loginUser(values))
                        .unwrap()
                        .then((data: any) => {
                            handleSetAccessToken(data.accessToken);
                            return navigate(from);
                        });
                    resetForm();
                }}
                validationSchema={validationSchema}
            >
                {(formikProps) => {
                    const { errors, values, handleChange, handleSubmit } = formikProps;
                    const { username, password } = values;
                    const { username: usernameError, password: passwordError } = errors;
                    return (
                        <form
                            className='w-full flex flex-col gap-[9px]'
                            onSubmit={handleSubmit}
                        >
                            <Field
                                as={Input}
                                name='username'
                                label='Tài khoản'
                                inputType='text'
                                value={username}
                                onChangeValue={handleChange}
                                placeholder='Tên tài khoản'
                                error={usernameError}
                            />
                            <Field
                                as={Input}
                                name='password'
                                label='Mật khẩu'
                                inputType='password'
                                value={password}
                                onChangeValue={handleChange}
                                placeholder='Mật khẩu'
                                error={passwordError}
                            />
                            {/* <p className='text-gray075 font-semibold text-xs mb-[21px]'>
                                Quên mật khẩu?
                            </p> */}
                            <div className={`mt-5`}>
                                <Button
                                    text='Đăng nhập'
                                    variant='primary'
                                    type='submit'
                                    size='lg'
                                    disabled={authLoading}
                                    loading={authLoading}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default LoginPage;
