import classNames from 'classnames/bind';
import { STORAGE_KEY, SOCKET_EVENT } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import socketClient from 'libs/socketClient';
import React, { FormEvent, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { createNewMessage } from 'redux/reducers/messageSlice';
import styles from './AddMessage.module.scss';

const cx = classNames.bind(styles);

const AddMessage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { receiverInfo } = useAppSelector((state) => state.friends);
    const { currentUser } = useAppSelector((state) => state.auth);

    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    const [content, setContent] = useState('');

    const handleSubmitMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!receiverInfo) {
            toast.info('Vui lòng chọn người muốn gửi tin nhắn');
            return;
        }
        if (!accessToken) {
            toast.info('Vui lòng đăng nhập');
            return;
        }

        dispatch(
            createNewMessage({
                receiverId: receiverInfo.id,
                content: content,
                accessToken: accessToken,
            }),
        );
        socketClient.emit(SOCKET_EVENT.SEND_MESSAGE, {
            senderName: currentUser.username,
            receiverName: receiverInfo.username,
            content: content,
        });
        setContent('');
    };

    const handleOpenImageModal = () => {
        toast.info('Opening modal to choose image');
    };

    return (
        <form className={cx('container')} onSubmit={handleSubmitMessage}>
            <div className={cx('image-button')} onClick={handleOpenImageModal}>
                <FiImage size={30} />
            </div>
            <input
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Aa'
                className={cx('input')}
            />
            <button
                className={cx('send-button', {
                    disabled: content === '',
                })}
                disabled={content === ''}
                type='submit'
            >
                <AiOutlineSend size={30} />
            </button>
        </form>
    );
};

export default AddMessage;
