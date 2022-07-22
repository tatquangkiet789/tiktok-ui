import React, { memo } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    type: string;
    text: string;
    size?: string;
    to?: string;
    iconLeft?: any;
    iconRight?: any;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    type = 'primary' || 'outlined' || 'default',
    text,
    size = 'md' || 'lg' || 'sm',
    to,
    iconLeft,
    iconRight,
    onClick,
}) => {
    let Frag: any = 'button';
    const otherProps = {
        onClick,
        to,
    };

    if (size === undefined) {
        size = 'md';
    }

    if (to) {
        otherProps.to = to;
        Frag = Link;
    }

    return (
        <Frag
            // className={type === 'primary' ? 'btn btn-primary' : 'btn btn-default'}
            className={`btn ${type} ${size}`}
            {...otherProps}
        >
            {iconLeft ? (
                <span className='mr-[8px] flex justify-center items-center'>
                    {iconLeft}
                </span>
            ) : (
                <></>
            )}
            {iconRight ? (
                <span className='ml-[8px] flex justify-center items-center'>
                    {iconRight}
                </span>
            ) : (
                <></>
            )}
            <span className='leading-[24px] text-[16px] font-semibold '>{text}</span>
        </Frag>
    );
};

export default memo(Button);
