import classNames from 'classnames/bind';
import { FC, memo } from 'react';
import styles from './TextAreaField.module.scss';

const cx = classNames.bind(styles);

interface ITextAreaFieldProps {
    name: string;
    value: any;
    placeholder?: string;
    error?: string;
    onChangeValue: (value: any) => void;
    numberOfRow: number;
    numberOfCol: number;
}

const TextAreaField: FC<ITextAreaFieldProps> = ({
    name,
    value,
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
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                rows={7}
                className={cx('textarea')}
                onChange={onChangeValue}
            />
        </div>
    );
};

export default memo(TextAreaField);
