import { MAX_INPUT_LENGTH } from 'constants/constants';
import { memo } from 'react';

type InputTypes = 'text' | 'password' | 'number' | 'file';

type InputProps = {
    name: string;
    label?: string;
    value: any;
    inputType: InputTypes;
    placeholder?: string;
    error?: string;
    onChangeValue: (value: any) => void;
};

const Input = memo(function Input({
    name,
    label,
    value,
    inputType,
    placeholder,
    error,
    onChangeValue,
}: InputProps) {
    return (
        <div className='w-full flex flex-col'>
            {label ? (
                <label className='text-xs mb-[5px] font-semibold'>{label}</label>
            ) : null}
            <input
                id={name}
                name={name}
                type={inputType}
                className={`caret-primary text-base flex-1 border-2 border-gray012 bg-gray006 ${
                    error && 'border border-red'
                } p-3 rounded-md focus:outline-none`}
                placeholder={placeholder}
                value={value}
                onChange={onChangeValue}
                maxLength={MAX_INPUT_LENGTH}
            />
            {error ? (
                <span className='text-xs text-red-500 font-semibold mb-[9px] mt-1'>
                    {error}
                </span>
            ) : null}
        </div>
    );
});

export default Input;
