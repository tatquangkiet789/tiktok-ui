import React from 'react';

const AccountItem: React.FC = () => {
    return (
        <div
            className='flex items-center py-[6px] px-[16px] cursor-pointer 
                hover:bg-[#16182308]'
        >
            <img
                src='https://res.cloudinary.com/dnwauajh9/image/upload/v1653748550/raiden-crying_lr8dfp.jpg'
                alt='Raiden Shogun'
                className='w-[40px] h-[40px] rounded-full object-cover'
            />
            <div className='flex-1 ml-[12px]'>
                <p className='font-medium text-[16px]'>Raiden Shogun</p>
                <p className='text-[#16182380] text-[14px]'>raiden.shogun</p>
            </div>
        </div>
    );
};

export default AccountItem;
