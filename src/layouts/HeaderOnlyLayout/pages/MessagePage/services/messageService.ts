import ENDPOINTS from 'constants/endpoints';
import { privateAxios } from 'libs/axiosClient';
import { IMessageDTO } from '../models/messageDTO';

// [GET] /api/v1/messages/:userId
export const findAllMessagesByUserIdService = async (messageDTO: IMessageDTO) => {
    const { userId, accessToken } = messageDTO;
    const response = await privateAxios.get(ENDPOINTS.findAllMessagesByUserId(userId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
