import axios from 'axios';
import { API_URL } from 'constants/api';

export const publicAxios = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});
