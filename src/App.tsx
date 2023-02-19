import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useLocalStorage from 'hooks/useLocalStorage';
import React, { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { findCurrentUserByAccessToken } from 'redux/reducers/authSlice';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const [storageValue, setStorageValue] = useLocalStorage('accessToken', '');

    useEffect(() => {
        if (currentUser) return;
        if (storageValue === '') return;

        dispatch(findCurrentUserByAccessToken(storageValue));
    }, [dispatch, currentUser, storageValue]);

    return (
        <React.Fragment>
            <AppRoutes />
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick={true}
            />
        </React.Fragment>
    );
};

export default App;
