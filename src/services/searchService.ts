import axiosClient from '../lib/axiosClient';

export const searchByName = async (keyword: string) => {
    const response = await axiosClient.get(
        `/users/search?q=${encodeURIComponent(keyword)}&type=less`,
    );
    return response.data;
};