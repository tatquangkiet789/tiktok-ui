import { CloseIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import TextAreaField from 'components/TextAreaField/TextAreaField';
import { Field, Formik } from 'formik';
import { useAppSelector } from 'hooks/useAppSelector';
import { ChangeEvent, FC, memo, useState } from 'react';
import styles from './CreateNewPost.module.scss';

const cx = classNames.bind(styles);

interface ICreateNewPostProps {
    onCloseCreateNewPostModal: (value: boolean) => void;
}

interface INewPostValueForm {
    caption: string;
    content?: File;
}

const CreateNewPost: FC<ICreateNewPostProps> = ({ onCloseCreateNewPostModal }) => {
    const { currentUser } = useAppSelector((state) => state.auth);

    const [caption, setCaption] = useState('');

    const hanldeCloseModal = () => {
        onCloseCreateNewPostModal(false);
    };

    const initialValues: INewPostValueForm = {
        caption: '',
        content: null as any,
    };

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <span onClick={hanldeCloseModal}>
                        <CloseIcon />
                    </span>
                    <p>Tạo bài viết</p>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {(formikProps) => {
                        const {
                            errors,
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                        } = formikProps;
                        return (
                            <form
                                className={cx('content')}
                                onSubmit={handleSubmit}
                                encType='multipart/form-data'
                            >
                                <Field
                                    as={TextAreaField}
                                    name='caption'
                                    value={values.caption}
                                    placeholder={`${currentUser.firstName} ơi, bạn đang nghĩ gì thế?`}
                                    onChangeValue={handleChange}
                                />
                                <Field
                                    as={InputField}
                                    name='content'
                                    label='Thêm ảnh/video'
                                    value={undefined}
                                    inputType='file'
                                    onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (!e.currentTarget.files) return;
                                        setFieldValue('avatar', e.currentTarget.files[0]);
                                    }}
                                />
                                <Button
                                    size='lg'
                                    text='Đăng'
                                    variant='primary'
                                    disabled={isSubmitting}
                                />
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default memo(CreateNewPost);
