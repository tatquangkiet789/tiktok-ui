import classNames from 'classnames/bind';
import { IComment } from 'models/comment';
import React, { useEffect, useState } from 'react';
import styles from './CommentList.module.scss';
import CommentItem from './components/CommentItem';

const cx = classNames.bind(styles);

interface ICommentListProps {
    comments: IComment[];
    userIdInPost: number;
}

const CommentList = React.forwardRef<HTMLDivElement, ICommentListProps>(
    ({ comments, userIdInPost }, ref) => {
        // const CommentList: React.FC<ICommentListProps> = ({ comments }) => {
        const [commentsWithoutChildren, setCommentsWithoutChildren] = useState<
            IComment[]
        >([]);

        useEffect(() => {
            const rootComments = [...comments].filter(
                (comment) => comment.parentId === null,
            );
            setCommentsWithoutChildren(rootComments);
        }, [comments]);

        return (
            <div className={cx('container')}>
                {commentsWithoutChildren.map(
                    ({ id, userDetail, content, createdDate }) => (
                        <CommentItem
                            key={id}
                            id={id}
                            content={content}
                            createdDate={createdDate}
                            userIdInPost={userIdInPost}
                            userDetail={userDetail}
                        />
                    ),
                )}
                <div ref={ref}></div>
            </div>
        );
    },
);

export default CommentList;
