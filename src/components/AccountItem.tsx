import React from 'react';

interface AccountItemProps {
    small?: boolean;
    name: string;
    username: string;
    image: string;
}

const AccountItem: React.FC<AccountItemProps> = ({ small, name, username, image }) => {
    let padding = 'py-[6px] px-[16px]';
    let imageSize = 'w-[40px] h-[40px]';
    let usernameFontSize = 'text-[14px]';

    if (small) {
        padding = 'p-2';
        imageSize = 'w-[32px] h-[32px]';
        usernameFontSize = 'text-[12px]';
    }

    return (
        <div
            className={`flex items-center ${padding} cursor-pointer 
                hover:bg-gray003`}
        >
            <img
                src={image}
                alt={name}
                className={`${imageSize} rounded-full object-cover`}
            />
            <div className='flex-1 ml-[12px]'>
                <p className='font-medium text-[16px]'>{name}</p>
                <p className={`text-gray05 ${usernameFontSize}`}>{username}</p>
            </div>
        </div>
    );
};

export default AccountItem;
