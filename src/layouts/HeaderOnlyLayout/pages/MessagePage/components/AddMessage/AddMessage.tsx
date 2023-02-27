import classNames from 'classnames/bind';
import React from 'react';
import styles from './AddMessage.module.scss';

const cx = classNames.bind(styles);

const AddMessage: React.FC = () => {
    return <div className={cx('container')}>AddMessage</div>;
};

export default AddMessage;
