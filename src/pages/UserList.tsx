import React, { useEffect } from 'react';
import { fetchAllUsers } from '../features/userSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const UserList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    return (
        <div
            className='flex flex-1 flex-col items-center dark:bg-gray-800
                space-y-20'
        >
            <p className='text-5xl tracking-widest dark:text-white mt-10'>Users page</p>
            <table className='dark:text-white border-separate border'>
                <thead>
                    <tr>
                        <th className='border border-black dark:border-white'>ID</th>
                        <th className='border border-black dark:border-white'>Name</th>
                        <th className='border border-black dark:border-white'>
                            Username
                        </th>
                        <th className='border border-black dark:border-white'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <th className='border border-black dark:border-white'>
                                {user.id}
                            </th>
                            <th className='border border-black dark:border-white'>
                                {user.name}
                            </th>
                            <th className='border border-black dark:border-white'>
                                {user.username}
                            </th>
                            <th className='border border-black dark:border-white'>
                                {user.email}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
