import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const darkTheme = localStorage.getItem('dark');
        if (darkTheme) {
            darkTheme === 'true' ? setDarkMode(true) : setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        const className = 'dark';
        const bodyClass = window.document.body.classList;

        darkMode ? bodyClass.add(className) : bodyClass.remove(className);
        localStorage.setItem('dark', String(darkMode));
    }, [darkMode, setDarkMode]);

    return [darkMode, setDarkMode] as const;
};

export default useDarkMode;
