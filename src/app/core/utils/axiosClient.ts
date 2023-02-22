import axios from 'axios';
import { API_URL } from '../constants/constants';

const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

export const privateAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosClient;
