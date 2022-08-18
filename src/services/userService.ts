import axiosClient from '../libs/axiosClient';

export const getAllUsers = async () => {
    // const response = await axiosClient.get('/users');
    const response = await axiosClient.get('/users');
    return response.data;
};
