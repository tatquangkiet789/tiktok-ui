import axios from 'axios';
import { BASE_URL, HOST } from '../constants/constants';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

export default axiosClient;
