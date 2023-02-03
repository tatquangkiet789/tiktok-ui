import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IComment } from 'models/comment';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { findAllCommentsByPostId } from 'redux/reducers/commentSlice';
import CommentItem from '../CommentItem/CommentItem';
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles);

interface ICommentListProps {
    userIdInPost: number;
    postId: number;
}

const CommentList: React.FC<ICommentListProps> = ({ userIdInPost, postId }) => {
    const [rootComments, setRootComments] = useState<IComment[]>([]);

    const { commentLoading, commentError, comments } = useAppSelector(
        (state) => state.comments,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(findAllCommentsByPostId({ postId: postId }));
    }, [dispatch, postId]);

    // Update comments list in UI
    useEffect(() => {
        setRootComments(
            [...comments]
                .filter((comment) => comment.parentId === null)
                .sort(
                    (a, b) =>
                        new Date(b.createdDate).getTime() -
                        new Date(a.createdDate).getTime(),
                ),
        );
    }, [comments]);

    const getChildComments = useCallback(
        (parentId: number) => {
            if (!comments) return;
            return [...comments]
                .filter((comment) => comment.parentId === parentId)
                .sort(
                    (a, b) =>
                        new Date(b.createdDate).getTime() -
                        new Date(a.createdDate).getTime(),
                );
        },
        [comments],
    );

    return (
        <div className={cx('container')}>
            {commentLoading ? (
                <h1>Đang tải bình luận...</h1>
            ) : commentError ? (
                <h1>{commentError}</h1>
            ) : (
                <Fragment>
                    {rootComments.map(
                        ({ id, userCommentDetail, content, createdDate }) => (
                            <CommentItem
                                key={id}
                                id={id}
                                content={content}
                                createdDate={createdDate}
                                userIdInPost={userIdInPost}
                                userDetail={userCommentDetail}
                                childComments={getChildComments(id)}
                            />
                        ),
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default CommentList;
