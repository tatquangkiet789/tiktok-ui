// import { CloseIcon } from 'assets/icons';
// import classNames from 'classnames/bind';
// import InputField from 'components/form/Input';
// import TextAreaField from 'components/form/TextAreaField/TextAreaField';
// import Button from 'components/ui/Button/Button';
// import { STORAGE_KEY } from 'constants/constants';
// import { Field, Formik } from 'formik';
// import { useAppDispatch } from 'hooks/useAppDispatch';
// import { useAppSelector } from 'hooks/useAppSelector';
// import { INewPost, INewPostForm } from 'modules/posts/models/postModel';
// import { ChangeEvent, FC } from 'react';
// import { createNewPost } from 'redux/reducers/postSlice';
// import styles from './CreateNewPost.module.scss';

// const cx = classNames.bind(styles);

// interface ICreateNewPostProps {
//     onCloseCreateNewPostModal: (value: boolean) => void;
// }

// const CreateNewPost: FC<ICreateNewPostProps> = ({ onCloseCreateNewPostModal }) => {
//     const { currentUser } = useAppSelector((state) => state.auth);
//     const { loading: postLoading } = useAppSelector((state) => state.posts);
//     const dispatch = useAppDispatch();

//     const hanldeCloseModal = () => {
//         onCloseCreateNewPostModal(false);
//     };

//     const initialValues: INewPostForm = {
//         caption: '',
//         content: null as any,
//     };

//     return (
//         <div className={cx('container')}>
//             <div className={cx('wrapper')}>
//                 <div className={cx('header')}>
//                     <span onClick={hanldeCloseModal}>
//                         <CloseIcon />
//                     </span>
//                     <p>Tạo bài viết</p>
//                 </div>
//                 <Formik
//                     initialValues={initialValues}
//                     onSubmit={(values, { resetForm }) => {
//                         const { caption, content } = values;
//                         const accessToken = sessionStorage.getItem(
//                             STORAGE_KEY.ACCESS_TOKEN,
//                         );
//                         if (!accessToken) return;
//                         const formData = new FormData();

//                         formData.append('caption', caption);
//                         if (content) formData.append('content', content);

//                         const value: INewPost = {
//                             formData,
//                             accessToken: accessToken,
//                         };

//                         dispatch(createNewPost(value))
//                             .unwrap()
//                             .then((result) => {
//                                 console.log(result);
//                                 onCloseCreateNewPostModal(false);
//                             });
//                         resetForm();
//                     }}
//                 >
//                     {(formikProps) => {
//                         const {
//                             values,
//                             handleChange,
//                             handleSubmit,
//                             isSubmitting,
//                             setFieldValue,
//                         } = formikProps;
//                         return (
//                             <form
//                                 className={cx('content')}
//                                 onSubmit={handleSubmit}
//                                 encType='multipart/form-data'
//                             >
//                                 <Field
//                                     as={TextAreaField}
//                                     name='caption'
//                                     value={values.caption}
//                                     placeholder={`${currentUser.firstName} ơi, bạn đang nghĩ gì thế?`}
//                                     onChangeValue={handleChange}
//                                 />
//                                 <Field
//                                     as={InputField}
//                                     name='content'
//                                     label='Thêm ảnh/video'
//                                     value={undefined}
//                                     inputType='file'
//                                     onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
//                                         if (!e.currentTarget.files) return;
//                                         setFieldValue(
//                                             'content',
//                                             e.currentTarget.files[0],
//                                         );
//                                     }}
//                                 />
//                                 <Button
//                                     size='lg'
//                                     text='Đăng'
//                                     variant='primary'
//                                     disabled={isSubmitting || values.caption === ''}
//                                     type='submit'
//                                     loading={postLoading}
//                                 />
//                             </form>
//                         );
//                     }}
//                 </Formik>
//             </div>
//         </div>
//     );
// };

// export default CreateNewPost;
export default function CreateNewPost() {
    return <h1>CreateNewPost</h1>;
}
