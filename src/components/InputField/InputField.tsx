import classNames from 'classnames/bind';
import React, { memo } from 'react';
import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

type InputTypes = 'text' | 'email' | 'password' | 'number';

interface IInputProps {
    label: string;
    value: string;
    inputType: InputTypes;
    placeholder?: string;
    onChangeValue: (value: string) => void;
}

const InputField: React.FC<IInputProps> = ({
    label,
    value,
    inputType,
    placeholder,
    onChangeValue,
}) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(e.target.value);
    };

    return (
        <div className={cx('container')}>
            <label className={cx('label')}>{label}</label>
            <div className={cx('input-container')}>
                <input
                    type={inputType}
                    className={cx('input')}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChangeValue}
                />
            </div>
        </div>
    );
};

export default memo(InputField);
