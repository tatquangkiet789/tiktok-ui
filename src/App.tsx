import { STORAGE_KEY } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { logoutUserService } from 'layouts/AuthLayout/services/authService';
import React, { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { findCurrentUserByAccessToken } from 'redux/reducers/authSlice';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
    const dispatch = useAppDispatch();

    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    useEffect(() => {
        if (!accessToken) return;

        dispatch(findCurrentUserByAccessToken(accessToken));
    }, [dispatch, accessToken]);

    return (
        <React.Fragment>
            <AppRoutes />
            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick={true}
            />
        </React.Fragment>
    );
};

export default App;
