import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from 'constants/api';
import { STORAGE_KEY } from 'constants/constants';

export const publicAxios = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

export const privateAxios = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: true,
});

const authInterceptor = (req: AxiosRequestConfig) => {
    try {
        // const currentDate = new Date();
        const accessToken = sessionStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
        // const decodedUser = jwt_decode<JwtPayload>(accessToken!);
        if (accessToken) {
            req.headers!['Authorization'] = `Bearer ${accessToken}`;
        }

        // if (decodedUser.exp && decodedUser.exp < currentDate.getTime() / 1000) {
        //     const data = await refreshTokenService();
        //     config.headers!['Authorization'] = `Bearer ${data.content}`;
        //     sessionStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.content);
        // }

        return req;
    } catch (err) {
        console.error(err);
    }
};

privateAxios.interceptors.request.use(authInterceptor);
