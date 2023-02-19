import { useEffect, useState } from 'react';

const useLocalStorage = (storageKey: string, initialValue: string) => {
    const [storageValue, setStorageValue] = useState(initialValue);

    useEffect(() => {
        const value = localStorage.getItem(storageKey);
        if (value) {
            setStorageValue(value);
            return;
        }
        setStorageValue(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, storageValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storageValue]);

    return [storageValue, setStorageValue] as const;
};

export default useLocalStorage;
