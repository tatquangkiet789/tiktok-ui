import classNames from 'classnames/bind';
import { IComment } from 'models/comment';
import React, { useEffect, useState } from 'react';
import styles from './CommentList.module.scss';
import CommentItem from './components/CommentItem';

const cx = classNames.bind(styles);

interface ICommentListProps {
    comments: IComment[];
}

const CommentList = React.forwardRef<HTMLDivElement, ICommentListProps>(
    ({ comments }, ref) => {
        // const CommentList: React.FC<ICommentListProps> = ({ comments }) => {
        const [commentsWithChildren, setCommentsWithChildren] = useState<IComment[]>([]);

        useEffect(() => {
            const rootComments = [...comments].filter(
                (comment) => comment.parentId === null,
            );
            setCommentsWithChildren(rootComments);
        }, [comments]);

        return (
            <div className={cx('container')}>
                {commentsWithChildren.map(({ id, userDetail, content, createdDate }) => (
                    <CommentItem
                        key={id}
                        id={id}
                        avatar={userDetail.avatar}
                        content={content}
                        userFirstName={userDetail.firstName}
                        userLastName={userDetail.lastName}
                        createdDate={createdDate}
                    />
                ))}
                <div ref={ref}></div>
            </div>
        );
    },
);

export default CommentList;
