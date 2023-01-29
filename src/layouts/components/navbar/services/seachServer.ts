import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IUser } from 'models/user';

// [GET] /api/v1/search?q=:keyword
export const findAllUsersByKeyword = async (keyword: string): Promise<IUser[]> => {
    const { data } = await axiosClient.get(ENDPOINTS.searchUsersByKeyword(keyword));
    return data.content;
};
