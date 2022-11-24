import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface IButtonProps {
    type: string;
    text: string;
    size?: string;
    to?: string;
    iconLeft?: any;
    iconRight?: any;
    onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
    type = 'primary' || 'outlined' || 'default',
    text,
    size = 'md' || 'lg' || 'sm',
    to,
    iconLeft,
    iconRight,
    onClick,
}) => {
    let Element: any = 'button';
    const props = {
        onClick,
        to,
    };
    const btnClass = cx('container', {
        [`${type}`]: true,
        [`${size}`]: true,
    });

    if (size === undefined) {
        size = 'md';
    }

    if (to) {
        props.to = to;
        Element = Link;
    }

    return (
        <Element className={btnClass} {...props}>
            {iconLeft ? <span className={cx('icon-left')}>{iconLeft}</span> : null}
            {iconRight ? <span className={cx('icon-right')}>{iconRight}</span> : null}
            <span className={cx('text')}>{text}</span>
        </Element>
    );
};

export default memo(Button);
