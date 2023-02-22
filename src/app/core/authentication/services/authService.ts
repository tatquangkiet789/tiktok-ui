import { ENDPOINTS } from 'app/core/constants/constants';
import axiosClient from 'app/core/utils/axiosClient';
import { IAuthDTO } from '../models/authDTO';
import { ILoginDTO } from '../models/loginDTO';

// [POST] /api/v1/auth/login
export const loginUserService = async (value: ILoginDTO): Promise<IAuthDTO> => {
    const response = await axiosClient.post(ENDPOINTS.login, value);
    return response.data;
};

// [POST] /api/v1/auth/register
export const registerUserService = async (user: FormData): Promise<string> => {
    const response = await axiosClient.post(ENDPOINTS.register, user, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
