import React from 'react';
import { Button } from '../components';
import { useAppDispatch } from '../hooks';
import { login, logout } from '../features/authSlice';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        dispatch(login());
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='h-screen overflow-y'>
            <p>Homepage</p>
            <div className='flex space-x-8 mt-8'>
                <Button text='Log in' type='primary' onClick={handleLogin} />
                <Button text='Log out' type='outlined' onClick={handleLogout} />
            </div>
        </div>
    );
};

export default Home;
