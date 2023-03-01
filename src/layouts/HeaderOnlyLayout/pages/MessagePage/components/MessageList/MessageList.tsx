import classNames from 'classnames/bind';
import React, { useEffect, useRef } from 'react';
import MessageItem from '../MessageItem/MessageItem';
import styles from './MessageList.module.scss';

const cx = classNames.bind(styles);

const MessageList: React.FC = () => {
    const lastestMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!lastestMessageRef.current) return;

        lastestMessageRef.current.scrollIntoView();
    }, []);

    const userList = [
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
            username: 'Nguyễn Thị  Thu Hà',
            lastestMessage:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut diam faucibus, hendrerit nisi eu, luctus neque. Nam fringilla, quam non porttitor congue, mauris odio sagittis mi, ut feugiat lectus nibh id ex. Fusce et tellus sodales, accumsan leo convallis, maximus purus. Maecenas at dolor quis ipsum ultricies tristique. Sed lacus mi, imperdiet non orci nec, efficitur maximus sem. Aliquam erat volutpat. Aliquam ut dignissim nisi. Mauris accumsan orci pretium mollis volutpat. Mauris nec massa ac turpis varius tincidunt ac non elit. Duis tempus urna ac enim varius, nec dignissim felis luctus. Phasellus viverra tincidunt tincidunt. Praesent vestibulum velit sed magna elementum, id maximus urna feugiat. Phasellus maximus nulla non pharetra ullamcorper.',
        },
    ];
    const senderList = [
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1671507776/uolu8eprll8lk63y6xja.jpg',
            username: 'Nguyễn Thị Hồng Hạnh',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1671507776/uolu8eprll8lk63y6xja.jpg',
            username: 'Nguyễn Thị Hồng Hạnh',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1671507776/uolu8eprll8lk63y6xja.jpg',
            username: 'Nguyễn Thị Hồng Hạnh',
            lastestMessage: 'Tin nhắn mới nhất',
        },
        {
            avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1671507776/uolu8eprll8lk63y6xja.jpg',
            username: 'Nguyễn Thị Hồng Hạnh',
            lastestMessage:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut diam faucibus, hendrerit nisi eu, luctus neque. Nam fringilla, quam non porttitor congue, mauris odio sagittis mi, ut feugiat lectus nibh id ex. Fusce et tellus sodales, accumsan leo convallis, maximus purus. Maecenas at dolor quis ipsum ultricies tristique. Sed lacus mi, imperdiet non orci nec, efficitur maximus sem. Aliquam erat volutpat. Aliquam ut dignissim nisi. Mauris accumsan orci pretium mollis volutpat. Mauris nec massa ac turpis varius tincidunt ac non elit. Duis tempus urna ac enim varius, nec dignissim felis luctus. Phasellus viverra tincidunt tincidunt. Praesent vestibulum velit sed magna elementum, id maximus urna feugiat. Phasellus maximus nulla non pharetra ullamcorper.',
        },
    ];
    return (
        <div className={cx('container')}>
            {userList.map(({ avatar, lastestMessage }, index) => (
                <MessageItem key={index} avatar={avatar} content={lastestMessage} />
            ))}
            {senderList.map(({ avatar, lastestMessage }, index) => (
                <MessageItem key={index} avatar={avatar} content={lastestMessage} />
            ))}
            {userList.map(({ avatar, lastestMessage }, index) => (
                <MessageItem key={index} avatar={avatar} content={lastestMessage} />
            ))}
            {senderList.map(({ avatar, lastestMessage }, index) => (
                <MessageItem key={index} avatar={avatar} content={lastestMessage} />
            ))}
            <div ref={lastestMessageRef}></div>
        </div>
    );
};

export default MessageList;
