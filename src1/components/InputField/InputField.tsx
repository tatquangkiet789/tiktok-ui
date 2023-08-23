import classNames from 'classnames/bind';
import { MAX_INPUT_LENGTH } from 'constants/constants';
import React, { memo } from 'react';
import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputTypes = 'text' | 'email' | 'password' | 'number' | 'file';

interface IInputProps {
    name: string;
    label?: string;
    value: any;
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
        <div
            className={cx('container', {
                error: error,
            })}
        >
            {label ? <label className={cx('label')}>{label}</label> : null}
            <input
                id={name}
                name={name}
                type={inputType}
                className={cx('input')}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
                maxLength={MAX_INPUT_LENGTH}
            />
            {error ? <span className={cx('error')}>{error}</span> : null}
        </div>
    );
};

export default memo(InputField);
