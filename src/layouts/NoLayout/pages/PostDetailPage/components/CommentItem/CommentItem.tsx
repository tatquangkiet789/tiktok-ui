import { TickIcon } from 'assets/icons';
import classNames from 'classnames/bind';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { IComment } from 'models/comment';
import { IUser } from 'models/user';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { findSelectedCommentById } from 'redux/reducers/commentSlice';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

interface ICommentItemProps {
    id?: number;
    content: string;
    createdDate: Date;
    disabledReply?: boolean;
    userIdInPost: number;
    userDetail: IUser;
    childComments?: IComment[];
}

const CommentItem: React.FC<ICommentItemProps> = ({
    id,
    content,
    createdDate,
    disabledReply,
    userIdInPost,
    userDetail,
    childComments,
}) => {
    const { avatar, lastName, firstName, id: userId, username, tick } = userDetail;

    const dispatch = useAppDispatch();

    const handleSetRepliedUserFullName = () => {
        dispatch(findSelectedCommentById(id!));
    };

    return (
        <div className={cx('container')}>
            <div className={cx('root-comment')}>
                <div
                    className={cx('avatar')}
                    style={{ backgroundImage: `url(${avatar})` }}
                ></div>
                <div className={cx('wrapper')}>
                    <Link to={`/${username}`} className={cx('username')}>
                        <p className={cx('fullname')}>
                            {lastName} {firstName}
                            {tick ? <TickIcon /> : null}
                        </p>
                        {userId === userIdInPost ? (
                            <p className={cx('author')}>Tác giả</p>
                        ) : null}
                    </Link>
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
            {childComments ? (
                <div className={cx('child-comment')}>
                    {childComments.map(
                        ({ id, userCommentDetail, content, createdDate }) => (
                            <CommentItem
                                key={id}
                                id={id}
                                content={content}
                                createdDate={createdDate}
                                disabledReply={true}
                                userIdInPost={userIdInPost}
                                userDetail={userCommentDetail}
                            />
                        ),
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default memo(CommentItem);
