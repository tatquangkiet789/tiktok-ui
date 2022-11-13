import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

const Switch: React.FC = () => {
    const [darkMode, setDarkMode] = useDarkMode();

    return (
        <div
            className='bg-gray-100 cursor-pointer relative w-16 h-8 rounded-full
                dark:bg-black dark:border-[1px] dark:border-white'
            onClick={() => setDarkMode(!darkMode)}
        >
            <input
                type='checkbox'
                id='check'
                className='sr-only peer'
                checked={darkMode}
                // onChange={() => setDarkMode(!darkMode)}
            />
            <span
                className='w-2/5 h-4/5 bg-gray-300 absolute rounded-full
                    left-[3px] top-[3px] peer-checked:left-[2.2rem] transition-all 
                    duration-500 shadow-sm'
            ></span>
        </div>
    );
};

export default Switch;
