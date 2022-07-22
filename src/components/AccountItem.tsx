import React from 'react';

interface AccountItemProps {
    small?: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({ small }) => {
    let padding = 'py-[6px] px-[16px]';
    let image = 'w-[40px] h-[40px]';
    let usernameFontSize = 'text-[14px]';

    if (small) {
        padding = 'p-2';
        image = 'w-[32px] h-[32px]';
        usernameFontSize = 'text-[12px]';
    }

    return (
        <div
            className={`flex items-center ${padding} cursor-pointer 
                hover:bg-gray003`}
        >
            <img
                src='https://res.cloudinary.com/dnwauajh9/image/upload/v1653748550/raiden-crying_lr8dfp.jpg'
                alt='Raiden Shogun'
                className={`${image} rounded-full object-cover`}
            />
            <div className='flex-1 ml-[12px]'>
                <p className='font-medium text-[16px]'>Raiden Shogun</p>
                <p className={`text-gray05 ${usernameFontSize}`}>raiden.shogun</p>
            </div>
        </div>
    );
};

export default AccountItem;
