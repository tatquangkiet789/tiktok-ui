import { STORAGE_KEY } from 'constants/constants';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { Fragment, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface IRequiredAuthProps {
    allowedRoles: number[];
}

const RequiredAuth: React.FC<IRequiredAuthProps> = ({ allowedRoles }) => {
    const { currentUser } = useAppSelector((state) => state.auth);
    const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    const location = useLocation();

    return (
        <Fragment>
            {!currentUser ? (
                <Navigate to='/auth/login' state={{ from: location }} replace />
            ) : allowedRoles.includes(currentUser.userRoleId) ? (
                <Outlet />
            ) : (
                <Navigate to='/unauthorized' state={{ from: location }} replace />
            )}
        </Fragment>
    );
};

export default RequiredAuth;
