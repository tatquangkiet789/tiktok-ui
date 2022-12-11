import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import styles from './MessagePage.module.scss';

const cx = classNames.bind(styles);

const MessagePage: React.FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);

    return (
        <div className={cx('container')}>
            <span className={cx('back-icon')}>
                <IoArrowBackOutline size={20} />
            </span>
            <div className={cx('sidebar')}>
                <div className={cx('sidebar-header')}>
                    <h3>Tin nhắn</h3>
                    <span>
                        <AiOutlineSetting size={32} />
                    </span>
                </div>
                <div className={cx('user-container')}>
                    <div className={cx('user-info')}>
                        <img src={currentUser.avatar} alt='User Avatar' />
                        <div>
                            <span>{currentUser.username}</span>
                            <span>Tin nhắn mới nhất</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('message')}></div>
        </div>
    );
};

export default MessagePage;
