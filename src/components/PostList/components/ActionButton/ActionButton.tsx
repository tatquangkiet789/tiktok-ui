import classNames from 'classnames/bind';
import React, { memo } from 'react';
import styles from './ActionButton.module.scss';

const cx = classNames.bind(styles);

interface IActionButtonProps {
    content: string;
    icon: any;
}

const ActionButton: React.FC<IActionButtonProps> = ({ icon, content }) => {
    return (
        <div className={cx('container')}>
            <span className={cx('icon')}>{icon}</span>
            <p className={cx('content')}>{content}</p>
        </div>
    );
};

export default memo(ActionButton);
