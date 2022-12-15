import classNames from 'classnames/bind';
import React, { memo } from 'react';
import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputTypes = 'text' | 'email' | 'password' | 'number';

interface IInputProps {
    name?: string;
    label: string;
    value: string;
    inputType: InputTypes;
    placeholder?: string;
    error?: string;
    onChangeValue: (value: any) => void;
}

const InputField: React.FC<IInputProps> = ({
    name,
    label,
    value,
    inputType,
    placeholder,
    error,
    onChangeValue,
}) => {
    return (
        <div className={cx('container')}>
            <label className={cx('label')}>{label}</label>
            <input
                id={name}
                name={name}
                type={inputType}
                className={cx('input')}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
            />
            {error ? <span className={cx('error')}>{error}</span> : null}
        </div>
    );
};

export default memo(InputField);
