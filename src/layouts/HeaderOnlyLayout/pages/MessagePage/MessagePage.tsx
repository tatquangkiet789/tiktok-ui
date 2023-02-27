import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import InputField from 'components/InputField/InputField';
import routes from 'constants/routes';
import React, { useState } from 'react';
import { IoArrowBackOutline, IoVideocamOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import AddMessage from './components/AddMessage/AddMessage';
import MessageList from './components/MessageList/MessageList';
import UserList from './components/UserList/UserList';
import styles from './MessagePage.module.scss';

const cx = classNames.bind(styles);

const MessagePage: React.FC = () => {
    const [userKeyword, setUserKeyword] = useState('');
    const receiverInfo = {
        avatar: 'https://res.cloudinary.com/dnwauajh9/image/upload/v1673514646/ixgzpprymidgmbjjzqih.jpg',
        username: 'Nguyễn Thị  Thu Hà',
        lastestMessage: 'Tin nhắn mới nhất',
    };

    return (
        <div className={cx('container')}>
            <Link to={routes.home} className={cx('back-icon')}>
                <IoArrowBackOutline size={30} />
            </Link>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar-header')}>
                    <h3>Tin nhắn</h3>
                </div>
                <div className={cx('search-user-container')}>
                    <InputField
                        inputType='text'
                        name='search'
                        label='Tìm kiếm người dùng'
                        value={userKeyword}
                        onChangeValue={(e) => setUserKeyword(e.target.value)}
                    />
                </div>
                <div className={cx('user-container')}>
                    <UserList />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('receiver-container')}>
                    <div className={cx('receiver-info')}>
                        <img
                            src={receiverInfo.avatar}
                            alt={receiverInfo.username}
                            className={cx('avatar')}
                        />
                        <p className={cx('username')}>{receiverInfo.username}</p>
                    </div>
                    <Tippy content='Bắt đầu gọi video'>
                        <span className={cx('video-call-button')}>
                            <IoVideocamOutline size={30} />
                        </span>
                    </Tippy>
                </div>
                <div className={cx('message-container')}>
                    <MessageList />
                    <AddMessage />
                </div>
            </div>
        </div>
    );
};

export default MessagePage;
