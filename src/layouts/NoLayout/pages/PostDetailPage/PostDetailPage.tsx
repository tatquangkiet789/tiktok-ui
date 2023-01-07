import classNames from 'classnames/bind';
import AccountInfo from 'components/AccountInfo/AccountInfo';
import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import { MAX_INPUT_LENGTH, POST_TYPE } from 'constants/constants';
import { Field, Formik } from 'formik';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { INewComment } from 'models/newComment';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { createNewComment, findAllCommentsByPostId } from 'redux/reducers/commentSlice';
import { findPostById, findPostByIdAPI } from 'redux/reducers/postSlice';
import numberFormat from 'utils/numberFormat';
import CommentList from './components/CommentList/CommentList';
import styles from './PostDetailPage.module.scss';

const cx = classNames.bind(styles);

interface ICommentFormValue {
    comment: string;
}

const PostDetailPage: React.FC = () => {
    const { id } = useParams();
    const lastCommentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();
    const { selectedPost, posts } = useAppSelector((state) => state.posts);
    const { comments, commentLoading, selectedComment } = useAppSelector(
        (state) => state.comments,
    );
    const { accessToken } = useAppSelector((state) => state.auth);

    const initialValues: ICommentFormValue = {
        comment: '',
    };

    useEffect(() => {
        if (id === undefined) return;

        const selectedId = parseInt(id);
        if (posts.length === 0) {
            dispatch(findPostByIdAPI(selectedId));
        } else {
            dispatch(findPostById(selectedId));
        }
        dispatch(findAllCommentsByPostId(selectedId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (id === undefined) return;

    //     const selectedId = parseInt(id);
    //     dispatch(findPostByIdAPI(selectedId));
    //     // dispatch(findAllCommentsByPostId(selectedId));
    //     setTimeout(() => {
    //         lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }, 100);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [comments]);

    if (!selectedPost) return <h1>Loading...</h1>;

    console.log(`Replied comment: `, selectedComment);

    return (
        <div className={cx('container')}>
            {selectedPost.postTypeId === POST_TYPE.TEXT ? null : (
                <div className={cx('post-content')}>
                    {selectedPost.postTypeId === POST_TYPE.IMAGE ? (
                        <div
                            className={cx('content')}
                            style={{ backgroundImage: `url(${selectedPost.postUrl})` }}
                        ></div>
                    ) : null}
                    {selectedPost.postTypeId === POST_TYPE.VIDEO ? (
                        <ReactPlayer width='400px' url={selectedPost.postUrl} controls />
                    ) : null}
                </div>
            )}
            <div className={cx('post-detail')}>
                <AccountInfo
                    firstName={selectedPost.userDetail.firstName}
                    lastName={selectedPost.userDetail.lastName}
                    avatar={selectedPost.userDetail.avatar}
                    username={selectedPost.userDetail.username}
                />
                <p className={cx('caption')}>{selectedPost.caption}</p>
                <div className={cx('like-comment-container')}>
                    <div>{numberFormat.format(selectedPost.likes)} lượt thích</div>
                    <div>{numberFormat.format(selectedPost.comments)} bình luận</div>
                </div>
                <div className={cx('comment-list')}>
                    {commentLoading ? (
                        <h1>Loading</h1>
                    ) : comments.length === 0 ? (
                        <h1>Không có bình luận</h1>
                    ) : (
                        <CommentList
                            userIdInPost={selectedPost.userDetail.id!}
                            comments={comments}
                            ref={lastCommentRef}
                        />
                    )}
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        const data: INewComment = {
                            postId: parseInt(id!),
                            content: values.comment,
                            accessToken: accessToken,
                            parentId: selectedComment.id,
                        };
                        dispatch(createNewComment(data));
                        resetForm();
                    }}
                >
                    {(formikProps) => {
                        const { values, handleChange, handleSubmit } = formikProps;
                        return (
                            <form className={cx('comment-input')} onSubmit={handleSubmit}>
                                {selectedComment ? (
                                    <p className={cx('reply-username')}>
                                        Trả lời @{selectedComment.userDetail.lastName}{' '}
                                        {selectedComment.userDetail.firstName}
                                    </p>
                                ) : null}
                                <div className={cx('input')}>
                                    <Field
                                        as={InputField}
                                        name='comment'
                                        inputType='text'
                                        value={values.comment}
                                        onChangeValue={handleChange}
                                        placeholder='Thêm bình luận'
                                    />
                                    <Button
                                        text='Đăng'
                                        disabled={Boolean(!values.comment)}
                                        variant='base'
                                        size='md'
                                        type='submit'
                                    />
                                </div>
                                {values.comment.length > 30 ? (
                                    <p
                                        className={cx('input-length', {
                                            max:
                                                values.comment.length ===
                                                MAX_INPUT_LENGTH,
                                        })}
                                    >
                                        {values.comment.length} / {MAX_INPUT_LENGTH}
                                    </p>
                                ) : null}
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default PostDetailPage;
