import ENDPOINTS from 'constants/endpoints';
import { privateAxios } from 'libs/axiosClient';
import { ICreateNewMessageDTO, IMessageDTO } from '../models/messageDTO';

// [GET] /api/v1/messages/:userId
export const findAllMessagesByUserIdService = async (params: IMessageDTO) => {
    const { userId, accessToken } = params;
    const response = await privateAxios.get(ENDPOINTS.findAllMessagesByUserId(userId), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

// [POST] /api/v1/messages/create
export const createNewMessageService = async (params: ICreateNewMessageDTO) => {
    const { accessToken, receiverId, content } = params;
    const response = await privateAxios.post(
        ENDPOINTS.createNewMessage,
        {
            receiverId: receiverId,
            content: content,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
    return response.data;
};
