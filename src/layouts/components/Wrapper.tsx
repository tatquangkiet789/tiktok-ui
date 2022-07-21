import React from 'react';

const Wrapper: React.FC = ({ children }) => {
    return (
        <div
            className='shadow-md pt-2 flex flex-col rounded-lg 
                min-h-[100px] max-h-[361px] overflow-y-auto w-full z-10 
                bg-[#ffff]'
        >
            {children}
        </div>
    );
};

export default Wrapper;
