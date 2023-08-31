import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { FC, Fragment, useCallback, useEffect, useState } from 'react';
import { findAllCommentsByPostId } from 'redux/reducers/commentSlice';
import CommentItem from '../CommentItem/CommentItem';
import styles from './CommentList.module.scss';
import { IComment } from 'modules/comments/models/commentModel';

const cx = classNames.bind(styles);

interface ICommentListProps {
    userIdInPost: number;
    // postId: number;
    comments: IComment[];
}

const CommentList: FC<ICommentListProps> = ({ userIdInPost, comments }) => {
    const [rootComments, setRootComments] = useState<IComment[]>([]);

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
            {rootComments.map(({ id, userCommentDetail, content, createdDate }) => (
                <CommentItem
                    key={id}
                    id={id}
                    content={content}
                    createdDate={createdDate}
                    userIdInPost={userIdInPost}
                    userDetail={userCommentDetail}
                    childComments={getChildComments(id)}
                />
            ))}
        </div>
    );
};

export default CommentList;
