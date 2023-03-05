import classNames from 'classnames/bind';
import { IMessage } from 'models/message';
import React, { Fragment, useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem';
import styles from './MessageList.module.scss';

const cx = classNames.bind(styles);

interface IMessageListProps {
    messageList: IMessage[];
    loading: boolean;
    error: string;
}

const MessageList: React.FC<IMessageListProps> = ({ messageList, loading, error }) => {
    const lastestMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lastestMessageRef.current) return;

        lastestMessageRef.current.scrollIntoView();
    }, []);

    return (
        <div className={cx('container')}>
            {messageList.length === 0 && loading ? (
                <p>Đang tải tin nhắn</p>
            ) : messageList.length === 0 ? (
                <p>Không tìm thấy tin nhắn</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Fragment>
                    {messageList.map(({ senderDetail, content, id }) => (
                        <MessageItem
                            key={id}
                            content={content}
                            senderId={senderDetail.id}
                            senderAvatar={senderDetail.avatar}
                        />
                    ))}
                </Fragment>
            )}
            <div ref={lastestMessageRef}></div>
        </div>
    );
};

export default MessageList;
