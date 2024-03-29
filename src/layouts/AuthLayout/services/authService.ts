import axios, { AxiosError } from 'axios';
import { BASE_URL } from 'constants/constants';
import ENDPOINTS from 'constants/endpoints';
import { privateAxios, publicAxios } from 'libs/axiosClient';
import { toast } from 'react-toastify';
import { ILoginFormValue } from '../models/login';

// [POST] /api/v1/auth/register
export const registerUserService = async (value: FormData) => {
    const res = await publicAxios.post(ENDPOINTS.register, value, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

// [GET] /api/v1/users/current-user
export const findCurrentUserByAccessTokenService = async (accessToken: string) => {
    const res = await privateAxios.get(ENDPOINTS.findCurrentUserByAccessToken, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
};

// [POST] /api/v1/auth/login
export const loginUserService = async (value: ILoginFormValue) => {
    const res = await publicAxios.post(ENDPOINTS.login, value, {
        withCredentials: true,
    });
    return res.data;
};

// [POST] /api/v1/auth/logout
export const logoutUserService = async () => {
    const res = await publicAxios.post(ENDPOINTS.logout, null, {
        withCredentials: true,
    });
    return res.data;
};

// [POST] /api/v1/auth/refresh-token
export const refreshTokenService = async () => {
    try {
        const response = await publicAxios.post(ENDPOINTS.refreshToken, null, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response) toast.error((err.response.data as any).message);
        else toast.error((error as AxiosError).message);
        return Promise.reject();
    }
};
