import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import { Register } from 'features/auth/models/authModel';
import { registerUser } from 'features/auth/services/authThunk';
import { Formik, Field } from 'formik';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { ChangeEvent, FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegisterPage: FC = () => {
    const { isLoading: authLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: Register = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        avatar: null as any,
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
        <Fragment>
            <h1 className='text-[32px] text-center flex-1 py-4'>Đăng ký</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    const { firstName, lastName, username, password, email, avatar } =
                        values;

                    if (!avatar) {
                        toast.error('Vui lòng chọn ảnh đại diện');
                        return;
                    }

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
                            className='w-full flex flex-col gap-[9px] mb-2'
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >
                            <Field
                                as={Input}
                                name='lastName'
                                label='Họ của bạn'
                                inputType='text'
                                value={values.lastName}
                                onChangeValue={handleChange}
                                placeholder='Nhập họ của bạn'
                                error={errors.lastName}
                            />
                            <Field
                                as={Input}
                                name='firstName'
                                label='Tên của bạn'
                                inputType='text'
                                value={values.firstName}
                                onChangeValue={handleChange}
                                placeholder='Nhập tên của bạn'
                                error={errors.firstName}
                            />
                            <Field
                                as={Input}
                                name='username'
                                label='Tên tài khoản'
                                inputType='text'
                                value={values.username}
                                onChangeValue={handleChange}
                                placeholder='Nhập tên tài khoản của bạn'
                                error={errors.username}
                            />
                            <Field
                                as={Input}
                                name='password'
                                label='Mật khẩu'
                                inputType='password'
                                value={values.password}
                                onChangeValue={handleChange}
                                placeholder='Nhập mật khẩu của bạn'
                                error={errors.password}
                            />
                            <Field
                                as={Input}
                                name='confirmPassword'
                                label='Tài khoản'
                                inputType='password'
                                value={values.confirmPassword}
                                onChangeValue={handleChange}
                                placeholder='Nhập lại mật khẩu'
                                error={errors.confirmPassword}
                            />
                            <Field
                                as={Input}
                                name='email'
                                label='Email của bạn'
                                inputType='text'
                                value={values.email}
                                onChangeValue={handleChange}
                                placeholder='Nhập email của bạn'
                                error={errors.email}
                            />
                            <Field
                                as={Input}
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
                            <div className=''>
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
        </Fragment>
    );
};

export default RegisterPage;
