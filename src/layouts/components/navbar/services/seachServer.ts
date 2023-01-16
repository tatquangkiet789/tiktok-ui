import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IUser } from 'models/user';

export const findAllUsersByKeyword = async (keyword: string): Promise<IUser[]> => {
    const response = await axiosClient.get(ENDPOINTS.searchUsersByKeyword(keyword));
    return response.data.content;
};
