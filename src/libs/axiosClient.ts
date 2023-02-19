import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { refreshTokenService } from 'layouts/AuthLayout/services/authService';
import { BASE_URL } from '../constants/constants';

const axiosClient = axios.create({
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
        const accessToken = localStorage.getItem('accessToken')!;
        const decodedUser = jwt_decode<JwtPayload>(accessToken!);
        console.log('Access token: ', accessToken);

        if (decodedUser.exp && decodedUser.exp < currentDate.getTime() / 1000) {
            console.log(decodedUser.exp);

            const data = await refreshTokenService();
            config.headers!['Authorization'] = `Bearer ${data.content}`;
            localStorage.setItem('accessToken', data.content);
            console.log('New accessToken: ' + localStorage.getItem('accessToken')!);
        }
        return config;
    } catch (err) {
        Promise.reject(err);
    }
});

export default axiosClient;
