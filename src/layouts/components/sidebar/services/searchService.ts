import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IUser } from 'models/user';

export const find10SuggestedUsers = async (): Promise<IUser[]> => {
    const response = await axiosClient.get(ENDPOINTS.findTop10SuggestedUsers);
    return response.data.content;
};
