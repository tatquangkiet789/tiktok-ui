import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ButtonVariants = 'primary' | 'outlined' | 'default';
type ButtonSizes = 'md' | 'lg' | 'sm';
type ButtonTypes = 'button' | 'submit';

interface IButtonProps {
    variant: ButtonVariants;
    text: string;
    size: ButtonSizes;
    type?: ButtonTypes;
    to?: string;
    iconLeft?: any;
    iconRight?: any;
    disabled?: boolean;
    onClick?: () => void;
}

const Button: React.FC<IButtonProps> = ({
    variant,
    text,
    size,
    type,
    to,
    iconLeft,
    iconRight,
    disabled,
    onClick,
}) => {
    let Element: any = 'button';
    const props = {
        onClick,
        to,
        type,
        disabled,
    };
    const btnClass = cx('container', {
        [`${variant}`]: true,
        [`${size}`]: true,
    });

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
