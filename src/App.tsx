import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { FC, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { findCurrentUserByAccessToken } from 'redux/reducers/authSlice';
import AppRoutes from './routes/AppRoutes';

const App: FC = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    useEffect(() => {
        if (currentUser) return;
        if (!accessToken) return;

        dispatch(findCurrentUserByAccessToken(accessToken));
    }, [dispatch, currentUser, accessToken]);

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
