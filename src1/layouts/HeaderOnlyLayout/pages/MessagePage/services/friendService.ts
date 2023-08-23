import ENDPOINTS from 'constants/endpoints';
import { privateAxios } from 'libs/axiosClient';
import { IFriendDTO } from '../models/friendDTO';

// [GET] /api/v1/users/friends
export const findAllFriendsService = async (params: IFriendDTO) => {
    const { accessToken } = params;
    const response = await privateAxios.get(ENDPOINTS.findAllFriends, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
