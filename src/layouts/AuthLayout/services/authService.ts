import ENDPOINTS from 'constants/endpoints';
import axiosClient from 'libs/axiosClient';
import { IAuth } from '../models/auth';
import { ILoginFormValue } from '../models/login';

// [POST] /api/v1/auth/login
export const loginUser = async (data: ILoginFormValue): Promise<IAuth> => {
    const { username, password } = data;
    const response = await axiosClient.post(ENDPOINTS.login, { username, password });
    return response.data.content;
};
