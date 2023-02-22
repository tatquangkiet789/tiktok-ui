import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { refreshTokenService } from 'layouts/AuthLayout/services/authService';
import { BASE_URL, LOCAL_STORAGE_KEY } from '../constants/constants';

export const publicAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

export const privateAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

privateAxios.interceptors.request.use(async (config) => {
    try {
        const currentDate = new Date();
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        console.log(`Current AccessToken: ${accessToken}`);
        const decodedUser = jwt_decode<JwtPayload>(accessToken!);

        if (decodedUser.exp && decodedUser.exp < currentDate.getTime() / 1000) {
            const data = await refreshTokenService();
            config.headers!['Authorization'] = `Bearer ${data.content}`;
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.content);
            console.log(
                `New AccessToken: ${localStorage.getItem(
                    LOCAL_STORAGE_KEY.ACCESS_TOKEN,
                )}`,
            );
        }
        return config;
    } catch (err) {
        Promise.reject(err);
    }
});
