import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IComment } from 'models/comment';
import React, { useEffect, useState } from 'react';
import { setRepliedUserFullName } from 'redux/reducers/commentSlice';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

interface ICommentItemProps {
    id?: number;
    avatar: string;
    userFirstName: string;
    userLastName: string;
    content: string;
    createdDate: Date;
    disabledReply?: boolean;
}

const CommentItem: React.FC<ICommentItemProps> = ({
    id,
    avatar,
    userFirstName,
    userLastName,
    content,
    createdDate,
    disabledReply,
}) => {
    const { comments } = useAppSelector((state) => state.comments);
    const dispatch = useAppDispatch();

    const [childComments, setChildComments] = useState<IComment[]>([]);

    useEffect(() => {
        const replyComments = [...comments].filter((comment) => comment.parentId === id);
        setChildComments(replyComments);
    }, []);

    const handleSetRepliedUserFullName = () => {
        const fullName = `${userLastName} ${userFirstName}`;
        dispatch(setRepliedUserFullName(fullName));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('root-comment')}>
                <div
                    className={cx('avatar')}
                    style={{ backgroundImage: `url(${avatar})` }}
                ></div>
                <div className={cx('wrapper')}>
                    <p className={cx('username')}>
                        {userLastName} {userFirstName}
                    </p>
                    <p className={cx('comment-content')}>{content}</p>
                    <div className={cx('action-container')}>
                        <span>{createdDate}</span>
                        {!disabledReply ? (
                            <button
                                className={cx('reply-button')}
                                onClick={handleSetRepliedUserFullName}
                            >
                                Phản hồi
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
            {childComments.length > 0 ? (
                <div className={cx('child-comment')}>
                    {childComments.map(({ id, userDetail, content, createdDate }) => (
                        <CommentItem
                            key={id}
                            id={id}
                            avatar={userDetail.avatar}
                            content={content}
                            userFirstName={userDetail.firstName}
                            userLastName={userDetail.lastName}
                            createdDate={createdDate}
                            disabledReply={true}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default CommentItem;
