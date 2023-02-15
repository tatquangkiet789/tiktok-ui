import axios from 'axios';
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

export default axiosClient;
