import classNames from 'classnames/bind';
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiImage } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './AddMessage.module.scss';

const cx = classNames.bind(styles);

const AddMessage: React.FC = () => {
    const handleSubmitMessage = () => {
        toast.info('Sending message');
    };

    const handleOpenImageModal = () => {
        toast.info('Opening modal to choose image');
    };

    return (
        <div className={cx('container')}>
            <div className={cx('image-button')} onClick={handleOpenImageModal}>
                <FiImage size={30} />
            </div>
            <input type='text' placeholder='Aa' className={cx('input')} />
            <div className={cx('send-button')} onClick={handleSubmitMessage}>
                <AiOutlineSend size={30} />
            </div>
        </div>
    );
};

export default AddMessage;
