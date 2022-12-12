import classNames from 'classnames/bind';
import React, { memo } from 'react';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

type InputTypes = 'text' | 'email' | 'password';

interface IInputProps {
    label: string;
    value: string;
    inputType: InputTypes;
    onChangeValue: (value: string) => void;
}

const Input: React.FC<IInputProps> = ({ label, value, inputType, onChangeValue }) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(e.target.value);
    };

    return (
        <div className={cx('container')}>
            <label>{label}</label>
            <input type={inputType} value={value} onChange={handleChangeValue} />
        </div>
    );
};

export default memo(Input);
